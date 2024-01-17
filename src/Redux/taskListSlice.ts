import { createSlice } from "@reduxjs/toolkit";
import { taskListType, taskType } from "../Types";

export const defaultTaskList: taskListType = {
    title:"Sample Task List"
}

export const defaultTask: taskType = {
    title:"Task title",
    description: "task description"
}

type taskListSliceType = {
    currentTaskList:[],
}

const initialState = {
    currentTaskList:[]
}

const taskListSlice = createSlice({
    name:"taskList",
    initialState,
    reducers:{
        setTaskList:(state,action) => {

        },
        addTaskList:(state,action) => {
            const newTaskList = action.payload;
            newTaskList.editMode = true;
            newTaskList.tasks = [];
            //state.currentTaskList.unshift(newTaskList);
            
            
        }
    }
});

export const { setTaskList, addTaskList } = taskListSlice.actions;
export default taskListSlice.reducer;