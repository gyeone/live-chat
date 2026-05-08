import { useState } from "react";
function Login() {
    const [nickname, setNickname] = useState("");
    return (
        <section className="login">
            <h2>닉네임을 입력해주세요</h2>
            <form id="nickname-form" onSubmit={handleSubmit}>
                <input
                    id="nickname"
                    type="text"
                    value={nickname}
                    maxLength={10}
                    onChange={(e) => setNickname(e.target.value.trim())}
                    placeholder="10자 이내의 닉네임을 입력하세요"
                />
                <button type="reset">x</button>
                <button>입장</button>
            </form>
        </section>
    );
}

export default Login;
