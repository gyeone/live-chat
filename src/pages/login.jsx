import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";

function Login() {
    const [nickname, setNickname] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        socket.on("welcome", (nickname) => {
            sessionStorage.setItem("nickname", nickname);
            navigate("/chatList");
            window.location.reload();
        });

        return () => {
            socket.off("welcome");
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (nickname) {
            socket.emit("nickname", nickname);
        }
    };
    return (
        <section className="login">
            <h2>닉네임을 입력해주세요</h2>
            <form id="nickname-form" onSubmit={handleSubmit}>
                <input
                    id="nickname"
                    type="text"
                    value={nickname}
                    maxLength={20}
                    onChange={(e) => setNickname(e.target.value.trim())}
                    placeholder="20자 이내의 닉네임을 입력하세요"
                />
                <button type="reset">x</button>
                <button>입장</button>
            </form>
            <button type="button" onClick={() => navigate("/signUp")}>
                회원가입
            </button>
        </section>
    );
}

export default Login;
