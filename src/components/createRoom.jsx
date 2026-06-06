import { useEffect, useState } from "react";
import socket from "../socket";
import "../styles/createRoom.css";

function CreateRoom({ onClose }) {
    const [roomName, setRoomName] = useState("");

    useEffect(() => {
        socket.on("create room error", (msg) => {
            alert(msg);
            setRoomName("");
        });

        socket.on("create room success", (msg) => {
            alert(msg);
            onClose();
            window.location.reload();
        });
        return () => {
            socket.off("create room error");
            socket.off("create room success");
        };
    }, []);
    const handleSubmit = (e) => {
        const nickname = sessionStorage.getItem("nickname");

        e.preventDefault();

        if (roomName) {
            socket.emit("create room", {
                roomName: roomName,
                nickname: nickname,
            });
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3>방 만들기</h3>
                <form id="roomName-form" onSubmit={handleSubmit}>
                    <input
                        id="roomName"
                        type="text"
                        maxLength={50}
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value.trim())}
                        placeholder="50자 이내의 방 이름을 입력하세요"
                    />
                    <button>완료</button>
                    <button type="button" onClick={onClose}>
                        닫기
                    </button>
                    <input id="isScret" type="checkbox" />
                    <label htmlFor="isScret">비밀방</label>
                    <input
                        type="text"
                        maxLength={10}
                        placeholder="10자 이내의 비밀번호를 입력하세요"
                    />
                </form>
            </div>
        </div>
    );
}

export default CreateRoom;
