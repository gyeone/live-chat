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

    //현재 접속자 수
    const count = io.sockets.sockets.size;
    io.emit("current users count", count);

    // 생성된 각 채팅방과 해당 채팅방의 최신 메시지와 시간 가져오기
    try {
        const rooms = await db.query(
            "SELECT * FROM rooms ORDER BY created_at DESC",
        );

        const roomsContent = await Promise.all(
            rooms.rows.map(async (room) => {
                const content = await db.query(
                    "SELECT content, created_at FROM messages WHERE room_id = $1 ORDER BY created_at DESC LIMIT 1",
                    [room.id],
                );

                return {
                    ...room,
                    roomContent: content.rows[0] || "",
                };
            }),
        );

        socket.emit("rooms content", roomsContent);
    } catch (e) {
        console.log("모든 채팅방 불러오기 실패", e.message);
    }
    });

    socket.on("disconnect", () => {
        console.log("클라이언트 연결 끊김");
    });
});
server.listen(port, () => {
    console.log(`서버 실행 중: http://localhost:${port}`);
});
