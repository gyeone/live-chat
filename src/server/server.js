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


io.on("connection", (socket) => {
    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
    });

    socket.on("welcome", (socket) => {
        socket.emit();
    });
server.listen(port, () => {
    console.log(`서버 실행 중: http://localhost:${port}`);
});
