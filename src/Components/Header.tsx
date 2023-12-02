import React from "react";
import { IoChatbubbleEllipses } from "react-icons/io5";
import {FiList} from "react-icons/fi";
import { Tilt } from 'react-tilt';
import Icon from "./Icon";
import AddTask from "./AddTask";
import UserHeaderInfo from "./UserHeaderInfo";
import { RootState } from "../Redux/store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const logo = require ("../Assets/logo192.png");

const Header = () => {
    const currentUser = useSelector((state:RootState) => state.user.currentUser);

    return (
        <div className="flex flex-wrap gap-5 justify-between items-center sm:flex-row bg-gradient-to-r from-black to-black px-5 py-5">
            <Tilt className="Tilt br2 shadow-2" options={{ max : 50 }} style={{ height: 70, width: 70 }}>
                <img  src={logo} alt='logo' className="cursor-pointer" />
            </Tilt>
            <div className="flex flex-row-reverse md:flex-row items-center justify-center gap-5 flex-wrap ">
                <AddTask />
                <Icon  IconName={IoChatbubbleEllipses} ping = {true} className="block"/>
                <Icon  IconName={FiList} className="block"/>
                <div className="group relative">
                    <UserHeaderInfo user = {currentUser} />
                    <div className="absolute pt-5 hidden group-hover:block w-full min-w-max">
                        <ul className="w-full bg-white overflow-hidden rounded-md shadow-md text-gray-700 pt-1">
                            <Link to= "/dashboard/profile" className="hover: bg-gray-200 py-2 block">
                                Profile
                            </Link>
                            <Link to= "/login" className="hover: bg-gray-200 py-2 block">
                                Logout
                            </Link>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;