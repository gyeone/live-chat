import "./App.css";
import "./styles/reset.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import MyPage from "./pages/myPage";
import Home from "./pages/home";

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/signUp" element={<SignUp />}></Route>
                    <Route path="/myPage" element={<MyPage />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default App;
