export type userType = {
    id: string,
    username: string,
    email: string,
    isOnline: boolean,
    img: string,
    creationTime?: string,
    lastSeen?: string
    bio?: string,
}

export type taskListType = {
    id?:string;
    title:string;
    editMode?:boolean;
    tasks?:taskType[];
}

export type taskType = {
    id?:string;
    title:string;
    description?:string;
    editMode?:boolean;
    collapsed?:boolean;
}