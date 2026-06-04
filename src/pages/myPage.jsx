import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyPage() {
    const [nickname, setNickname] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const nickname = sessionStorage.getItem("nickname");
        setNickname(nickname);
    });

    const toPrevPage = () => {
        navigate("/chatList");
        window.location.reload();
    };
    return (
        <section className="myPage">
            <button type="button" onClick={toPrevPage}>
                이전
            </button>
            <h2>{nickname}</h2>
        </section>
    );
}
export default MyPage;
