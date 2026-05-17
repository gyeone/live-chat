import socket from "../socket";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function ChatRoom() {
    const [nickname, setNickname] = useState("");
    const [inputMsg, setInputMsg] = useState("");
    const [messages, setMessages] = useState([]);
    const [allalert, setAllAlert] = useState("");
    const [roomName, setRoomName] = useState("");

    const navigate = useNavigate();
    const { state } = useLocation();

    useEffect(() => {
        const nickname = sessionStorage.getItem("nickname");
        setNickname(nickname);
        setRoomName(state);

        if (!nickname) {
            navigate("/");
            return;
        }

        socket.emit("join", { roomName: state, nickname: nickname });

        socket.on("room join msg", (msg) => {
            setAllAlert(msg);
        });

        socket.on("room leave msg", (msg) => {
            setAllAlert(msg);
        });

        socket.on("prev messages", (rows) => {
            setMessages(rows);
        });

        socket.on("chat message", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            socket.off("join");
            socket.emit("leave", { roomName: state, nickname: nickname });
            socket.off("room join msg");
            socket.off("room leave msg");
            socket.off("prev messages");
            socket.off("chat message");
        };
    }, [state]);

    const toPrevPage = () => {
        navigate("/chatList");
        window.location.reload();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (inputMsg) {
            socket.emit("chat message", {
                inputMsg: inputMsg,
                roomName: state,
                nickname: nickname,
            });
            setInputMsg("");
        }
    };

    return (
        <>
            <section id="chatRoom">
                <div className="chatRoom-header">
                    <button type="button" onClick={toPrevPage}>
                        이전
                    </button>
                    <h2>{roomName}</h2>
                </div>
                <p id="room-alert">{allalert}</p>
                <ul id="messages">
                    {messages.map((msg, i) => (
                        <li key={i}>
                            {msg.content} <span>{msg.created_at}</span>
                        </li>
                    ))}
                </ul>
                <form id="inputMsg-form" onSubmit={handleSubmit}>
                    <input
                        id="input"
                        type="text"
                        value={inputMsg}
                        autoComplete="off"
                        onChange={(e) => setInputMsg(e.target.value)}
                    />
                    <button>전송</button>
                </form>
            </section>
        </>
    );
}

export default ChatRoom;
