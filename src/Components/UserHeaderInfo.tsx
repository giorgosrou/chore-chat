import React from "react";

const storedUserData = JSON.parse(localStorage.getItem('user') || '{}');
const profileImage = storedUserData.img ;
const profileName = `${storedUserData.username}` ;
const accountCreationText = `Joined in ${storedUserData.creationTime}` ;

const UserHeaderInfo = () => {
    return(
        <div className=" cursor-pointer flex  items-center gap-4" >
            <div>
                <img className = "w-12 h-12  p-3 ring-white ring-2 rounded-full cursor-pointer" src={profileImage} alt="profileFoto" />
            </div>
            <div className="text-white">
                <div className="-mb-1">{profileName}</div> 
                <div className="text-sm text-gray">{accountCreationText}</div>
            </div>
        </div>
    )
}

export default UserHeaderInfo