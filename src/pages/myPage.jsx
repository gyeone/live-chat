import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";
import defaultImg from "../assets/images/default_img.png";

function MyPage() {
    const [nickname, setNickname] = useState("");
    const [profile, setProfile] = useState();

    const maxFileSize = 500 * 1024;

    const navigate = useNavigate();

    useEffect(() => {
        const nickname = sessionStorage.getItem("nickname");

        setNickname(nickname);
        socket.emit("get profile img", nickname);

        if (!nickname) {
            navigate("/login");
            return;
        }

        socket.on("profile img", (imgUrl) => {
            if (imgUrl === null) return;

            setProfile(`http://localhost:3000${imgUrl}`);
        });

        return () => {
            socket.off("profile img");
        };
    }, []);

    const toPrevPage = () => {
        navigate("/");
        window.location.reload();
    };

    const handleProfile = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        if (file.size > maxFileSize) {
            alert("파일 용량은 500KB르 초과할 수 없습니다");
            e.target.value = "";
            file = null;
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            setProfile(reader.result);
        };

        reader.readAsDataURL(file);

        const arrayBufferReader = new FileReader();
        arrayBufferReader.onloadend = () => {
            socket.emit("upload profile img", {
                nickname: nickname,
                fileName: file.name,
                fileData: arrayBufferReader.result,
            });
        };
        arrayBufferReader.readAsArrayBuffer(file);

        e.target.value = "";
    };
    return (
        <section className="myPage">
            <button type="button" onClick={toPrevPage}>
                이전
            </button>
            <h2>{nickname}</h2>

            <div>
                <img
                    id="myPage-profile-img"
                    src={profile ? profile : defaultImg}
                    alt="프로필사진"
                />
                <label htmlFor="profilefile">+</label>
                <input
                    id="profilefile"
                    type="file"
                    accept="image/*"
                    onChange={handleProfile}
                />
            </div>
        </section>
    );
}
export default MyPage;
