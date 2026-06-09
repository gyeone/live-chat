import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatList from "../components/chatList";
import comment from "../data/homeComment.json";

function Home() {
    const [nickname, setNickname] = useState("");
    const [commentId, setCommentId] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const nickname = sessionStorage.getItem("nickname");
        setNickname(nickname);

        if (!nickname) {
            navigate("/login");
            return;
        }

        const random = Math.floor(Math.random() * 10);
        setCommentId(random);
    }, []);

    return (
        <>
            <section className="home">
                <ChatList />
                <div className="home-contents">
                    <h2>{nickname}님 반갑습니다!</h2>
                    <p>{comment[commentId].comment}</p>
                </div>
            </section>
        </>
    );
}

export default Home;
