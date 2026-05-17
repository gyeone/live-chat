import express from "express";
import pg from "pg";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const port = process.env.PORT || 3000;
const { Pool } = pg;
const db = new Pool({
    host: "127.0.0.1",
    user: "postgres",
    password: "0522",
    database: "baekChat",
    port: 5432,
});

const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {},
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
        optionsSuccessStatus: 200,
    },
});

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
        optionsSuccessStatus: 200,
    }),
);

io.on("connection", async (socket) => {
    console.log("클라이언트 연결됨");
    // 닉네임 저장
    socket.on("nickname", async (nickname) => {
        try {
            const result = await db.query(
                "SELECT nickname FROM users WHERE nickname = $1",
                [nickname],
            );

            if (result.rows.length === 0) {
                await db.query("INSERT INTO users (nickname) VALUES ($1)", [
                    nickname,
                ]);
            }

            socket.emit("welcome", nickname);
        } catch (e) {
            console.log("닉네임 저장 실패", e.message);
        }
    });

    //현재 접속자 수 불러오기
    try {
        await setTimeout(() => {
            const count = io.engine.clientsCount;
            socket.emit("current users count", count);
        }, 1000);
    } catch (e) {
        console.log("현재 접속자 수 불러오기 실패", e.message);
    }

    // 생성된 각 채팅방과 해당 채팅방의 최신 메시지와 시간 가져오기
    try {
        const rooms = await db.query(
            "SELECT * FROM rooms ORDER BY created_at DESC",
        );

        const roomsContent = await Promise.all(
            rooms.rows.map(async (room) => {
                const content = await db.query(
                    "SELECT content, created_at FROM messages WHERE room_name = $1 ORDER BY created_at DESC LIMIT 1",
                    [room.name],
                );

                return {
                    ...room,
                    roomContent: content.rows[0] || "",
                };
            }),
        );
        await setTimeout(() => {
            socket.emit("rooms content", roomsContent);
        }, 1000);
    } catch (e) {
        console.log("모든 채팅방 불러오기 실패", e.message);
    }

    // 방 새로 만들기
    socket.on("create room", async ({ roomName, nickname }) => {
        try {
            const result = await db.query(
                "SELECT room_name FROM rooms WHERE room_name = $1",
                [roomName],
            );

            if (result.rows.length > 0) {
                return socket.emit(
                    "create room error",
                    "이미 존재하는 채팅방입니다 다른 이름을 입력해주세요",
                );
            }
            await db.query(
                "INSERT INTO rooms (room_name, created_by) VALUES ($1, $2)",
                [roomName, nickname],
            );

            socket.emit(
                "create room success",
                `새로운 "${roomName}" 방이 생겼습니다`,
            );
        } catch (e) {
            console.log("방 만들기 실패", e.message);
        }
    });

    // 채팅방 입장
    try {
        socket.on("join", ({ roomName, nickname }) => {
            socket.join(roomName);
            io.to(roomName).emit(
                "room join msg",
                `${nickname} 님이 입장하였습니다`,
            );
        });
    } catch (e) {
        console.log("채팅방 입장에 실패하였습니다");
    }

    // 채팅방 퇴장
    try {
        socket.on("leave", ({ roomName, nickname }) => {
            io.to(roomName).emit(
                "room leave msg",
                `${nickname} 님이 퇴장하였습니다`,
            );
        });
    } catch (e) {
        console.log("채팅방 퇴장에 실패하였습니다");
    }

    // 이전 메세지 불러오기
    try {
        const result = await db.query(
            "SELECT content, TO_CHAR(created_at, 'YYYY-MM-DD HH24:MI:SS') AS created_at FROM messages ORDER BY created_at ASC",
        );

        socket.emit("prev messages", result.rows);
    } catch (e) {
        console.log("이전 메시지 불러오기 실패", e.message);
    }

    // 입력한 메시지 저장
    socket.on("chat message", async ({ inputMsg, roomName, nickname }) => {
        try {
            const result = await db.query(
                "INSERT INTO messages (content, room_name, user_name) VALUES ($1, $2, $3) RETURNING content, TO_CHAR(created_at, 'YYYY-MM-DD HH24:MI:SS') AS created_at",
                [inputMsg, roomName, nickname],
            );

            io.to(roomName).emit("chat message", result.rows[0]);
        } catch (e) {
            console.log("메시지 저장 실패", e.message);
        }
    });
        console.log("클라이언트 연결 끊김");
    });
});
server.listen(port, () => {
    console.log(`서버 실행 중: http://localhost:${port}`);
});
