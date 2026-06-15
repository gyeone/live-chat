import { useEffect, useState } from "react";
import socket from "../socket";
import CreateRoom from "./createRoom";
import { useNavigate } from "react-router-dom";
import ChatRoom from "./chatRoom";
import SecretRoomPw from "./secretRoomPw";
import defaultImg from "../assets/images/default_img.png";
import baekchatLogo from "../assets/images/baekchat-logo.png";
import { BsLayoutSidebar } from "react-icons/bs";
import { RiRadioButtonLine } from "react-icons/ri";
import { PiUserList } from "react-icons/pi";
import { RxPencil2 } from "react-icons/rx";
import { RiChat3Line } from "react-icons/ri";
import { FiLock } from "react-icons/fi";
import "../styles/chatList.css";

function ChatList({ setIsChatRoom }) {
    const [nickname, setNickname] = useState("");
    const [profile, setProfile] = useState();
    const [count, setCount] = useState(0);
    const [userList, setUserList] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectRoom, setSelectRoom] = useState("");
    const [isChatRoomOpen, setIsChatRoomOpen] = useState(false);
    const [isPwModalOpen, setIsPwModalOpen] = useState(false);
    const [issideBarOpen, setIsSideBarOpen] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const nickname = sessionStorage.getItem("nickname");
        setNickname(nickname);

        if (nickname) {
            socket.emit("get profile img", nickname);
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
                setIsChatRoom(true);
            }
        });

        socket.on("profile img", (imgUrl) => {
            if (imgUrl === null) return;

            setProfile(`http://localhost:3000${imgUrl}`);
        });

        return () => {
            socket.off("current users count");
            socket.off("current users");
            socket.off("rooms content");
            socket.off("profile img");
            socket.off("is secret room");
        };
    }, []);

    const handleChatRoom = (roomName) => {
        setSelectRoom(roomName);
        socket.emit("is secret room", roomName);
    };

    return (
        <>
            <section
                className={`chatList ${issideBarOpen ? "chatList-hidden" : "close"} `}
            >
                {" "}
                <div className="chatList-header">
                    <button
                        type="button"
                        onClick={() => setIsSideBarOpen(true)}
                    >
                        <img
                            src={baekchatLogo}
                            className="logo"
                            alt="백톡로고"
                        />
                    </button>
                </div>
                <h2 className="online-count">{count}명</h2>
                <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    <RxPencil2 className="chatList-icon" />
                </button>
                <RiChat3Line className="chatList-icon" />
                <button
                    id="chatList-close-profile"
                    type="button"
                    onClick={() => navigate("/myPage")}
                >
                    <img
                        id="my-profile-img"
                        src={profile ? profile : defaultImg}
                        alt="프로필사진"
                    />
                </button>
            </section>
            <section
                className={`chatList ${issideBarOpen ? "" : "chatList-hidden"} `}
            >
                <div className="chatList-header">
                    <img src={baekchatLogo} className="logo" alt="백톡로고" />
                    <button
                        type="button"
                        onClick={() => setIsSideBarOpen(false)}
                    >
                        <BsLayoutSidebar className="chatList-icon" />
                    </button>
                </div>
                <div className="chatList-contents">
                    <div className="chatlist-menu">
                        <RiRadioButtonLine className="chatList-icon" />
                        <h2>현재 접속자 수 {count}명</h2>
                    </div>
                    <div className="chatlist-menu">
                        <PiUserList className="chatList-icon" />
                        <h2>현재 접속자</h2>
                    </div>
                    <ul className="current-users">
                        {userList &&
                            userList.map((user) => (
                                <li key={user.nickname}>{user.nickname}</li>
                            ))}
                    </ul>
                    <button
                        type="button"
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        <RxPencil2 className="chatList-icon" />새 채팅방
                    </button>
                </div>
                <div className="chatList-rooms">
                    <h2>채팅방</h2>
                    <ul className="rooms">
                        {rooms.map((room) => (
                            <li
                                className="room"
                                key={room.room_name}
                                onClick={() => handleChatRoom(room.room_name)}
                            >
                                <div className="room-title">
                                    {room.pw && (
                                        <FiLock className="chatList-secretRoom-icon" />
                                    )}
                                    <p>{room.room_name}</p>
                                </div>
                                {!room.pw && (
                                    <div className="room-content">
                                        <p id="room-content-chat">
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
                    <div className="chatList-footer">
                        <div className="chatlist-menu">
                            <img
                                id="my-profile-img"
                                src={profile ? profile : defaultImg}
                                alt="프로필사진"
                            />

                            <p>{nickname}님</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => navigate("/myPage")}
                        >
                            마이페이지
                        </button>
                    </div>
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
                    setIsChatRoom={setIsChatRoom}
                />
            )}
        </>
    );
}

export default ChatList;
