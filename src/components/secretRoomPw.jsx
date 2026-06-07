import { useEffect, useState } from "react";
import socket from "../socket";

function SecretRoomPw({ onClose, roomName, setIsChatRoomOpen }) {
    const [roomPw, setRoomPw] = useState("");

    useEffect(() => {
        socket.on("secret room error", (msg) => {
            alert(msg);
            setRoomPw("");
        });

        socket.on("secret room success", () => {
            onClose();
            setIsChatRoomOpen();
        });

        return () => {
            socket.off("secret room error");
            socket.off("secret room success");
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (roomName && roomPw) {
            socket.emit("secret room", {
                roomName: roomName,
                roomPw: roomPw,
            });
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3> 비밀번호 입력</h3>
                <button type="button" onClick={onClose}>
                    닫기
                </button>
                <form id="roomName-form" onSubmit={handleSubmit}>
                    <input
                        id="roomPw"
                        type="text"
                        maxLength={10}
                        value={roomPw}
                        onChange={(e) => setRoomPw(e.target.value.trim())}
                        placeholder="10자 이내의 비밀번호를 입력하세요"
                    />

                    <button>입장</button>
                </form>
            </div>
        </div>
    );
}

export default SecretRoomPw;
