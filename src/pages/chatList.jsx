import { useEffect, useState } from "react";
import socket from "../socket";

function ChatList() {
    const [nickname, SetNickname] = useState("");
    const [count, setCount] = useState(0);

    useEffect(() => {
        const nickname = socket.nickname || sessionStorage.getItem("nickname");
        SetNickname(nickname);

        socket.on("current users count", (count) => {
            setCount(count);
        });
        return () => {
            socket.off("welcome");
            socket.off("current users count");
        };
    }, []);
    return (
        <>
            <section id="chatList">
                <div className="chatList-header">
                    <h2>{nickname}님 반갑습니다!</h2>
                    <h2>현재 접속자 수 {count}명</h2>
                </div>
                <ul></ul>
            </section>
        </>
    );
}

export default ChatList;
