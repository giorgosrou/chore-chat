import React, { useState } from "react";
import { IoChatbubbleEllipses } from "react-icons/io5";
import {FiList} from "react-icons/fi";
import { Tilt } from 'react-tilt';
import Icon from "./Icon";
import AddTask from "./AddTask";
import UserHeaderInfo from "./UserHeaderInfo";
import { RootState } from "../Redux/store";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
const logo = require ("../Assets/logo192.png");

const Header = () => {
    const currentUser = useSelector((state:RootState) => state.user.currentUser);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const goTo = useNavigate();

    const handleSignOut = () => {
        
    }

    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

    const handleGoToPage = (page:string) => {
        goTo(page)
        setCurrentPage(page)
    }

    const setCurrentPage = (page:string) => {
        localStorage.setItem("user-page", page);
    }

    const getCurrentPage = () => {
        return localStorage.getItem("user-page");
    }

    return (
        <div className="flex flex-wrap gap-5 justify-between items-center sm:flex-row bg-gradient-to-r from-black to-black px-5 py-5">
            <Tilt className="Tilt br2 shadow-2" options={{ max : 50 }} style={{ height: 70, width: 70 }}>
                <img  src={logo} alt='logo' className="cursor-pointer" />
            </Tilt>
            <div className="flex flex-row-reverse md:flex-row items-center justify-center gap-5 flex-wrap ">
                {(getCurrentPage() === '/dashboard')
                ?
                <>
                <AddTask />
                <Icon  IconName={IoChatbubbleEllipses} ping = {true} className="block" onClick={() => handleGoToPage('/dashboard/chat')}/>
                </>
                : (getCurrentPage() === '/dashboard/chat')
                ?
                <>
                <Icon  IconName={FiList} className="block" onClick={() => handleGoToPage('/dashboard')}/>
                </>
                :
                <>
                <Icon  IconName={FiList} className="block" onClick={() => handleGoToPage('/dashboard')}/>
                <Icon  IconName={IoChatbubbleEllipses} ping = {true} className="block" onClick={() => handleGoToPage('/dashboard/chat')}/>
                </>
                }

                {/* <AddTask />
                <Icon  IconName={IoChatbubbleEllipses} ping = {true} className="block" onClick={() => handleGoToPage('/dashboard/chat')}/>
                <Icon  IconName={FiList} className="block" onClick={() => handleGoToPage('/dashboard/list')}/> */}

                <div className="group relative" onClick={toggleDropdown} >
                    <UserHeaderInfo user = {currentUser} />
                    <div className={` pt-5 absolute ${isDropdownOpen ? 'block' : 'hidden'} w-full min-w-max`}>
                        <ul className="w-full bg-white overflow-hidden rounded-md shadow-md text-gray-700 pt-1">
                            <Link to= "/dashboard/profile" className="cursor-pointer hover: bg-gray-200 py-2 block" onClick= {() => handleGoToPage('/dashboard/profile')}>
                                Profile
                            </Link>
                            <Link to= "/login" className=" cursor-pointer hover: bg-gray-200 py-2 block" onClick= {() => handleSignOut}>
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