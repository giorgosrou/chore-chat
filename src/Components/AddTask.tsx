import React from "react";
import Button from "./Button";
import Icon from "./Icon";
import {MdAdd} from "react-icons/md";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/store";
import { BE_addTaskList } from "../Backend/Queries";

const AddTask = () => {
    const dispatch = useDispatch<AppDispatch>();
    const localStorageUser = JSON.parse(localStorage.getItem('user') || '{}');

    const handleAddTaskList = () => {
        BE_addTaskList(dispatch,localStorageUser.id)
    }
    return (
        <>
            <Button 
            name="Add new task board"
            onClick={handleAddTaskList}
            secondary
            className="hidden md:flex" 
        />
            <Icon IconName={MdAdd} className="block md:hidden" />
        </>
    )
}

export default AddTask