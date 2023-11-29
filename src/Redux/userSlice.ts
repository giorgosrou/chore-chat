import { createSlice } from "@reduxjs/toolkit";
import { userType } from "../Types";

export const defaultUser: userType = {
    isOnline: false,
    id: "",    
    username: "",
    email: "",
    img: "",
    creationTime: "",
    lastSeen: "",
    bio: "", 
}

const initialState = {
    //user:[]
    currentUser: defaultUser,
    //currentSelectedUser:null
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers: {
        setUser:(state,action) => {
            state.currentUser = action.payload || defaultUser; // Update currentUser with the received user data
        },
        setUsers:(state,action) => {
            //set all users
        },
    },
});

export const { setUser, setUsers } = userSlice.actions
export default userSlice.reducer;