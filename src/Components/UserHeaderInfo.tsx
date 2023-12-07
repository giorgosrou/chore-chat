import React from "react";
import { userType } from "../Types";

type PropsType = {
    user: userType;
    handleClick?:() => void;
};

const UserHeaderInfo = ({user,handleClick}: PropsType) => {
    return(
        <div
            onClick = {handleClick}
            className = "cursor-pointer flex items-center gap-4" >
            <div>
                <img className = "w-12 h-12 p-3 ring-white ring-2 rounded-full cursor-pointer" src={user.img} alt="profileFoto" />
            </div>
            <div className="text-white">
                <div className="-mb-1">{user.username}</div> 
                <div className="text-sm text-gray hidden md:flex ">Joined in {user.creationTime} </div>
            </div>
        </div>
    )
}

export default UserHeaderInfo