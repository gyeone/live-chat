import { useEffect, useState } from "react";
function CreateRoom({ onClose }) {
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
                </form>
            </div>
        </div>
    );
}

export default CreateRoom;
