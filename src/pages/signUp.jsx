import { useNavigate } from "react-router-dom";
function SignUp() {
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nickname || !password) {
            alert("아이디와 비밀번호를 모두 입력해주세요.");
            return;
        }
    };

    return (
        <section className="signUp">
            <h2>회원가입</h2>
            <form id="signUp-form" onSubmit={handleSubmit}>
                <input
                    id="nickname"
                    type="text"
                    value={nickname}
                    maxLength={20}
                    onChange={(e) => setNickname(e.target.value.trim())}
                    placeholder="20자 이내의 닉네임을 입력하세요"
                />
                <input
                    id="password"
                    type="password"
                    value={password}
                    maxLength={20}
                    onChange={(e) => setPassword(e.target.value.trim())}
                    placeholder="20자 이내의 비밀번호를 입력하세요"
                />
                <button>회원가입</button>
            </form>
            <button type="button" onClick={() => navigate("/")}>
                로그인
            </button>
        </section>
    );
}

export default SignUp;
