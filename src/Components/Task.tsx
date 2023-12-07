import React from "react";
import Input from "./Input";
import Icon from "./Icon";
import { MdDelete, MdEdit } from "react-icons/md";

const Task = () => {
    return (
        <div className="p-2 mb-2 rounded-md bg-white text-black">
            <div>
                <p className="cursor-pointer">
                    Task Title
                </p>
            </div>
            <div>
                <hr/>
                <div>
                <p>
                    Description
                </p>
                <div className="flex justify-end">
                    <Icon IconName={MdEdit} reduceOpacityOnHover={true} />
                    <Icon IconName={MdDelete} reduceOpacityOnHover={true}  />
                </div>
                       
                </div>
            </div>

        </div>
    );
};

export default Task;