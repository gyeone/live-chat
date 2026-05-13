import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
    const [nickname, SetNickname] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const nickname = socket.nickname || sessionStorage.getItem("nickname");
        SetNickname(nickname);

        if (!nickname) {
            navigate("/");
            return;
        }
    }, []);
