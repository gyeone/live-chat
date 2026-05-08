import { useEffect, useState } from "react";
import socket from "../socket";

function ChatList() {
    const [nickname, SetNickname] = useState("");

    useEffect(() => {
        socket.on("welcome", (nickname) => {
            SetNickname(nickname);
        });
        return () => {
            socket.off("welcome");
        };
    }, []);
    return (
        <>
            <section id="chat-list">
                <div className="chatList-header">
                    <h2>{nickname}님 반갑습니다!</h2>
                </div>
                <ul></ul>
            </section>
        </>
    );
}

export default ChatList;
