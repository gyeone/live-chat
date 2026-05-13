import { useEffect, useState } from "react";
import socket from "../socket";
import CreateRoom from "../components/createRoom";
import { useNavigate } from "react-router-dom";

function ChatList() {
    const [nickname, SetNickname] = useState("");
    const [count, setCount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const nickname = sessionStorage.getItem("nickname");
        SetNickname(nickname);

        if (!nickname) {
            navigate("/");
            return;
        }

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
                    <button type="button" onClick={() => setIsModalOpen(true)}>
                        + 방 만들기
                    </button>
                </div>
                <ul></ul>
            </section>
            {isModalOpen && (
                <CreateRoom onClose={() => setIsModalOpen(false)} />
            )}
        </>
    );
}

export default ChatList;
