function CreateRoom() {
    return (
        <dialog>
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
            </form>
        </dialog>
    );
}

export default CreateRoom;
