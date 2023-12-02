import React from "react";

const ListPage = () => {
    const storedUserData = JSON.parse(localStorage.getItem('user') || '{}');
    const bio = storedUserData.bio ;
    return (
        <div className="text-black text-center opacity-80 font-bold text-4xl md:text-6xl mb-10">
            <h1 >{bio}</h1>
        </div>
    )
}

export default ListPage;