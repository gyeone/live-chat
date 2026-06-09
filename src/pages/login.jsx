import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";
import "../styles/login&signUp.css";

function Login() {
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const nickname = sessionStorage.getItem("nickname");

        if (nickname) {
            setNickname(nickname);
            navigate("/");
        }
        socket.on("welcome", (nickname) => {
            sessionStorage.setItem("nickname", nickname);
            navigate("/");
            window.location.reload();
        });

        socket.on("login id fail", (msg) => {
            alert(msg);
            setNickname("");
            setPassword("");
        });

        socket.on("login pw fail", (msg) => {
            alert(msg);
            setPassword("");
        });

        return () => {
            socket.off("welcome");
            socket.off("login id fail");
            socket.off("login pw fail");
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nickname || !password) {
            alert("아이디와 비밀번호를 모두 입력해주세요.");
            return;
        }

        socket.emit("nickname", { nickname: nickname, password: password });
    };
    return (
        <section className="login">
            <h2 id="login-title">로그인하고 채팅을 시작해요</h2>
            <form id="nickname-form" onSubmit={handleSubmit}>
                <input
                    id="nickname"
                    type="text"
                    value={nickname}
                    maxLength={20}
                    onChange={(e) => setNickname(e.target.value.trim())}
                    placeholder="20자 이내의 닉네임"
                />
                <input
                    id="password"
                    type="password"
                    value={password}
                    maxLength={20}
                    onChange={(e) => setPassword(e.target.value.trim())}
                    placeholder="20자 이내의 비밀번호"
                />
                <button>입장</button>
            </form>
            <button type="button" onClick={() => navigate("/signUp")}>
                회원가입
            </button>
        </section>
    );
}

export default Login;
