import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatList from "../components/chatList";

function Home() {
    const [nickname, setNickname] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const nickname = sessionStorage.getItem("nickname");
        setNickname(nickname);

        if (!nickname) {
            navigate("/");
            return;
        }
    }, []);

    return (
        <>
            <section id="home">
                <h2>{nickname}님 반갑습니다!</h2>
            </section>
            <ChatList />
        </>
    );
}

export default Home;
