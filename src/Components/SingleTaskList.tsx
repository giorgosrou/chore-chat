import React from "react";
import Icon from "./Icon";
import { MdAdd } from "react-icons/md";

const SingleTaskList = () => {
    return(
        <div>
            <div className="bg-white w-full md:w-(400px) drop-shadow-md min-h-[150px] rounded-md mt-10 mr-5 ml-5 mb-10">
                <div className="flex flex-wrap items-center justify-center md:gap-10 bg-gradient-to-tr 
                from-black to-black p-3 text-white text-center ">
                    something here
                </div>
                <div>

                </div>
            </div>
            <Icon IconName={MdAdd} />
        </div>
    )
}

export default SingleTaskList;