import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import ChatList from "./pages/chatList";
import SignUp from "./pages/signUp";
import MyPage from "./pages/myPage";

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />}></Route>
                    <Route path="/signUp" element={<SignUp />}></Route>
                    <Route path="/chatList" element={<ChatList />}></Route>
                    <Route path="/myPage" element={<MyPage />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default App;
