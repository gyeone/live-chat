import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";
import "../styles/login&signUp.css";

function SignUp() {
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        socket.on("signUp fail", (msg) => {
            alert(msg);
            setNickname("");
        });

        socket.on("signUp success", (msg) => {
            alert(msg);
            navigate("/login");
            return;
        });

        return () => {
            socket.off("signUp fail");
            socket.off("signUp success");
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nickname || !password) {
            alert("아이디와 비밀번호를 모두 입력해주세요.");
            return;
        }

        socket.emit("signUp", { nickname: nickname, password: password });
    };

    return (
        <section className="signUp">
            <h2 id="signUp-title">회원가입</h2>
            <form id="signUp-form" onSubmit={handleSubmit}>
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
                <button>회원가입</button>
            </form>
            <button type="button" onClick={() => navigate("/login")}>
                로그인
            </button>
        </section>
    );
}

export default SignUp;
