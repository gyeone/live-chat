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
                "SELECT * FROM users WHERE nickname = $1",
                [nickname],
            );

            console.log("저장 전", result.rows);

            if (result.rows.length === 0) {
                await db.query("INSERT INTO users (nickname) VALUES ($1)", [
                    nickname,
                ]);
            }

            io.emit("welcome", nickname);
        } catch (e) {
            console.log("닉네임 저장 실패", e.message);
        }
    });

    //현재 접속자 수
    const count = io.sockets.sockets.size;
    io.emit("current users count", count);
    });

    socket.on("disconnect", () => {
        console.log("클라이언트 연결 끊김");
    });
});
server.listen(port, () => {
    console.log(`서버 실행 중: http://localhost:${port}`);
});
