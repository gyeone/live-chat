import "../styles/chatRoom.css";
import { io } from "socket.io-client";

const socket = io();

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

const handleSubmit = () => {
    e.preventDefault();
    if (input.value) {
        socket.emit("chat message", input.value);
        input.value = "";
    }
};

socket.on("chat message", (msg) => {
    const item = document.createElement("li");
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

function ChatRoom() {
    return (
        <>
            <section id="message-bar">
                <ul id="messages"></ul>
                <form id="form" action="">
                    <input id="input" autocomplete="off" />
                    <button>Send</button>
                </form>
            </section>
        </>
    );
}

export default ChatRoom;
