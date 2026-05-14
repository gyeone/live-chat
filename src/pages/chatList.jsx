import { useEffect, useState } from "react";
import socket from "../socket";
import CreateRoom from "../components/createRoom";
import { useNavigate } from "react-router-dom";

function ChatList() {
    const [nickname, SetNickname] = useState("");
    const [count, setCount] = useState(0);
    const [rooms, setRooms] = useState([]);
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
                    <div className="chatList-rooms">
                        <ul className="rooms">
                            {rooms.map((room, i) => (
                                <li className="room" key={i}>
                                    <p>{room.room_name}</p>
                                    <p>
                                        {room.roomContent?.content
                                            ? room.roomContent.content
                                            : "채팅 내용이 없습니다"}
                                    </p>
                                    <p>{room.roomContent?.created_at}</p>
                                </li>
                            ))}
                            {rooms.length === 0 && <p>생성된 방이 없습니다.</p>}
                        </ul>
                    </div>
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
