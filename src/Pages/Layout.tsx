import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";

const Layout = () => {
    return (
        <div className="h-(100vh) flex flex-col">
            <Header />
            <div className="bg-pattern flex-1 min-h-[90vh] opacity-20 overflow-y-scroll ">
                <Outlet/>
            </div>
        </div>
    );
};

export default Layout;