import { useEffect, useState } from "react";

function MyPage() {
    const [nickname, setNickname] = useState("");

    useEffect(() => {
        const nickname = sessionStorage.getItem("nickname");
        setNickname(nickname);
    });
    return (
        <section className="myPage">
            <h2>{nickname}</h2>
        </section>
    );
}
export default MyPage;
