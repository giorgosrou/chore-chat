import React from "react";
import Icon from "./Icon";
import { MdAdd, MdDelete, MdEdit, MdExpandMore } from "react-icons/md";
import Tasks from "./Tasks";
import Task from "./Task";

const SingleTaskList = () => {
    return(
        <div className="relative">
            <div className="bg-slate-300 w-full md:w-[400px] drop-shadow-md min-h-[150px] rounded-md overflow-hidden">
                <div className="flex flex-wrap items-center justify-center md:gap-10 bg-gradient-to-tr 
                from-black to-black p-3 text-white text-center ">
                    Task List Name
                    <div className="flex-wrap flex gap-3 justify-center items-center">
                        <Icon IconName={MdEdit} reduceOpacityOnHover={true} />
                        <Icon IconName={MdDelete} reduceOpacityOnHover={true}/>
                        <Icon IconName={MdExpandMore} reduceOpacityOnHover={true}/>
                    </div>
                </div>
                <div>
                    <Tasks />
                </div>
            </div>
            <Icon IconName={MdAdd} className="absolute p-3 -mt-6 -ml-4 hover:bg-mypink" />
        </div>
    )
}

export default SingleTaskList;