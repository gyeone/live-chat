import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
    const [nickname, SetNickname] = useState("");
    const [roomName, setRoomName] = useState("");

    const navigate = useNavigate();
    const { state } = useLocation();

    useEffect(() => {
        const nickname = sessionStorage.getItem("nickname");
        SetNickname(nickname);
        setRoomName(state);

        if (!nickname) {
            navigate("/");
            return;
        }
    }, []);
