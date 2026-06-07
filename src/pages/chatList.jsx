import { useEffect, useState } from "react";
import socket from "../socket";
import CreateRoom from "../components/createRoom";
import { useNavigate } from "react-router-dom";
import ChatRoom from "../components/chatRoom";
import SecretRoomPw from "../components/secretRoomPw";

function ChatList() {
    const [nickname, setNickname] = useState("");
    const [count, setCount] = useState(0);
    const [userList, setUserList] = useState([]);
    const [messages, setMessages] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectRoom, setSelectRoom] = useState("");
    const [isChatRoomOpen, setIsChatRoomOpen] = useState(false);
    const [isPwModalOpen, setIsPwModalOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const nickname = sessionStorage.getItem("nickname");
        setNickname(nickname);

        if (!nickname) {
            navigate("/");
            return;
        }

        socket.on("current users", (userList) => {
            setUserList(userList);
        });

        socket.on("current users count", (count) => {
            setCount(count);
        });

        socket.on("rooms content", (rooms) => {
            setRooms(rooms);
        });

        socket.on("is secret room", (isSecretRoom) => {
            setIsPwModalOpen(isSecretRoom);
            if (isSecretRoom === false) {
                setIsChatRoomOpen(true);
            }
        });

        return () => {
            socket.off("current users count");
            socket.off("current users");
            socket.off("rooms content");
        };
    }, []);

    const handleChatRoom = (roomName) => {
        setSelectRoom(roomName);
        socket.emit("is secret room", roomName);
    };

    return (
        <>
            <section id="chatList">
                <div className="chatList-header">
                    <h2>{nickname}님 반갑습니다!</h2>
                    <button type="button" onClick={() => navigate("/myPage")}>
                        마이페이지
                    </button>
                    <h2>현재 접속자 수 {count}명</h2>
                    <h2>현재 접속자</h2>
                    <ul>
                        {userList &&
                            userList.map((user, i) => (
                                <li key={i}>{user.nickname}</li>
                            ))}
                    </ul>
                    <button
                        type="button"
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        + 방 만들기
                    </button>
                </div>
                <div className="chatList-rooms">
                    <ul className="rooms">
                        {rooms.map((room, i) => (
                            <li
                                className="room"
                                key={i}
                                onClick={() => handleChatRoom(room.room_name)}
                            >
                                <p>{room.room_name}</p>
                                {!room.pw && (
                                    <div>
                                        <p>
                                            {room.roomContent?.content
                                                ? room.roomContent?.content
                                                : "채팅 내용이 없습니다"}
                                        </p>
                                        <p>{room.roomContent?.created_at}</p>
                                    </div>
                                )}
                            </li>
                        ))}
                        {rooms.length === 0 && <p>생성된 방이 없습니다.</p>}
                    </ul>
                </div>
            </section>
            {isCreateModalOpen && (
                <CreateRoom onClose={() => setIsCreateModalOpen(false)} />
            )}
            {selectRoom && isPwModalOpen && (
                <SecretRoomPw
                    onClose={() => setIsPwModalOpen(false)}
                    roomName={selectRoom}
                    setIsChatRoomOpen={() => setIsChatRoomOpen(true)}
                />
            )}
            {selectRoom && isChatRoomOpen && (
                <ChatRoom
                    nickname={nickname}
                    roomName={selectRoom}
                    setIsChatRoomOpen={() => setIsChatRoomOpen(false)}
                />
            )}
        </>
    );
}

export default ChatList;
