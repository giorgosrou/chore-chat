import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import LoginPage from "./Pages/LoginPage";
import Layout from "./Pages/Layout";
import ProfilePage from "./Pages/ProfilePage";
import ChatPage from "./Pages/ChatPage";
import ListPage from "./Pages/ListPage";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element = {<LoginPage />}/>
                <Route path="/dashboard" element = {< Layout />}>
                    <Route index element = {<ListPage />}/>
                    <Route path="chat" element = {<ChatPage />}/>
                    <Route path="profile" element = {<ProfilePage />}/>
                </Route>
                <Route path="*" element = {<Navigate to={"/dashboard"}/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App; 