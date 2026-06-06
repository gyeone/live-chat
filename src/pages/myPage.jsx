import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultImg from "../assets/images/default_img.png";

function MyPage() {
    const [nickname, setNickname] = useState("");
    const [profile, setProfile] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        const nickname = sessionStorage.getItem("nickname");

        setNickname(nickname);
        socket.emit("get profile img", nickname);

        if (!nickname) {
            navigate("/");
            return;
        }

        socket.on("profile img", (imgUrl) => {
            setProfile(`http://localhost:3000${imgUrl}`);
        });

        return () => {
            socket.off("profile img");
        };
    }, []);

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

            <div>
                <img src={profile ? profile : defaultImg} alt="프로필사진" />
            </div>
        </section>
    );
}
export default MyPage;
