import { useEffect, useState } from "react";
import socket from "../socket";
import "../styles/create&secretRoom.css";
import { FiUnlock } from "react-icons/fi";
import { FiLock } from "react-icons/fi";

function CreateRoom({ onClose }) {
    const [roomName, setRoomName] = useState("");
    const [isSecret, setIsSecret] = useState(false);
    const [roomPw, setRoomPw] = useState("");

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
                roomPw: roomPw,
            });
        }
    };

    const handleIsSecret = () => {
        isSecret ? setIsSecret(false) : setIsSecret(true);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="createRoom-modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <h3>방 만들기</h3>
                <button
                    id="createRoom-modal-close"
                    type="button"
                    onClick={onClose}
                >
                    닫기
                </button>
                <form id="createRoom-form" onSubmit={handleSubmit}>
                    <input
                        id="roomName"
                        type="text"
                        maxLength={50}
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value.trim())}
                        placeholder="50자 이내의 방 이름을 입력하세요"
                    />
                    {isSecret && (
                        <input
                            id="roomPw"
                            type="text"
                            maxLength={10}
                            value={roomPw}
                            onChange={(e) => setRoomPw(e.target.value.trim())}
                            placeholder="10자 이내의 비밀번호를 입력하세요"
                        />
                    )}

                    <label htmlFor="isScret">
                        {isSecret ? (
                            <FiLock id="isScret-icon" />
                        ) : (
                            <FiUnlock id="isScret-icon" />
                        )}
                        <input
                            id="isScret"
                            type="checkbox"
                            checked={isSecret}
                            onChange={handleIsSecret}
                        />
                        <p>비밀방</p>
                    </label>

                    <button id="createRoom-success">완료</button>
                </form>
            </div>
        </div>
    );
}

export default CreateRoom;
