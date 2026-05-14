import socket from "../socket";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function ChatRoom() {
    const [nickname, SetNickname] = useState("");
    const [inputMsg, setInputMsg] = useState("");
    const [roomName, setRoomName] = useState("");

    const navigate = useNavigate();
    const { state } = useLocation();

    useEffect(() => {
        const nickname = sessionStorage.getItem("nickname");
        SetNickname(nickname);
        setRoomName(state);

        if (!nickname) {
            navigate("/");
            return;
        }
    }, []);

    const toPrevPage = () => {
        navigate("/chatList");
        window.location.reload();
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (inputMsg) {
            socket.emit("chat message", { inputMsg, roomName, nickname });
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
