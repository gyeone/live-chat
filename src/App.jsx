import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import ChatList from "./pages/chatList";

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />}></Route>
                    <Route path="/chatList" element={<ChatList />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default App;
