function SecretRoomPw({ onClose, setIsChatRoomOpen }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3> 비밀번호 입력</h3>
                <button type="button" onClick={onClose}>
                    닫기
                </button>
        </div>
    );
}

export default SecretRoomPw;
