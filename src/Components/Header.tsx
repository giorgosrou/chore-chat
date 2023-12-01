import React from "react";
import { IoChatbubbleEllipses } from "react-icons/io5";
import {FiList} from "react-icons/fi";
import { Tilt } from 'react-tilt';
import Icon from "./Icon";
import AddTask from "./AddTask";
import UserHeaderInfo from "./UserHeaderInfo";
const logo = require ("../Assets/logo192.png");

const Header = () => {
    return (
        <div className="flex flex-wrap gap-5 justify-between items-center sm:flex-row bg-gradient-to-r from-black to-black px-5 py-5">
            <Tilt className="Tilt br2 shadow-2" options={{ max : 50 }} style={{ height: 70, width: 70 }}>
                <img  src={logo} alt='logo' className="cursor-pointer" />
            </Tilt>
            <div className="flex flex-row-reverse md:flex-row items-center justify-center gap-5 flex-wrap ">
                <AddTask />
                <Icon  IconName={IoChatbubbleEllipses} ping = {true} className="block"/>
                <Icon  IconName={FiList} className="block"/>
                <UserHeaderInfo />
            </div>
        </div>
    )
}

export default Header;