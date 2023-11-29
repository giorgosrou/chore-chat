import React from "react";
import { Tilt } from 'react-tilt';
import Button from "./Button";
const logo = require ("../Assets/logo192.png");


const Header = () => {
    return (
        <div className="flex flex-wrap gap-5 justify-between items-center sm:flex-row bg-gradient-to-r from-black to-black px-5 py-5">
            <Tilt className="Tilt br2 shadow-2" options={{ max : 50 }} style={{ height: 70, width: 70 }}>
                <img  src={logo} alt='logo' className="cursor-pointer" />
            </Tilt>
            <div className="flex">
                <Button name="Add new Task" secondary />
            </div>
        </div>
    )
}

export default Header;