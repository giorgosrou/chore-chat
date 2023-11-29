import React from "react";
import Login from "../Components/Login";
import Register from "../Components/Register";

const RegistrationPage = () => {
    return(
        <div className = "h-[100vh] flex items-center justify-center p-10">
            <div className="h-full w-full bg-gradient-to-r from-black to-gray-dark opacity-70 absolute top-0 -z-10"/>
            <div className="h-full w-full absolute bg-pattern -z-20 top-0"/>
            <Register/>
        </div>
    );
};

export default RegistrationPage;