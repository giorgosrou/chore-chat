import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth, signOut } from "firebase/auth";
import { auth, db } from "./Firebase";
import { toast } from 'react-toastify';
import { toastError, toastSuccess } from "../Utils/toasts";
import { catchErr } from "../Utils/catchErr";
import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { taskListType, userType } from "../Types";
import { defaultUser, setUser } from "../Redux/userSlice";
import convertTime from "../Utils/convertTime";
import avatarGenerator from "../Utils/avatarGenerator";
import { AppDispatch } from "../Redux/store";
import { NavigateFunction } from "react-router-dom";
import taskListSlice, { addTaskList, defaultTaskList } from "../Redux/taskListSlice";
import { IoNewspaperOutline } from "react-icons/io5";

type RegisterQueryData = {
    email: string;
    password: string;
    validPassword: string;
}

type LoginQueryData = {
    email: string;
    password: string;
}
//collections
const usersCollection: string = "users"
const tasksCollection: string = "tasks"
const taskListCollection: string = "taskList"

export const BE_signUp = (
    data: RegisterQueryData,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>, 
    reset: () => void,
    goTo: NavigateFunction,
    dispatch: AppDispatch,
) => {
    setLoading(true);
    if (data.email && data.password) {
        if (data.password === data.validPassword) {
            createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(async user => {
                //generate user avatar given the username
                const imageLink = avatarGenerator(user.user.email?.split('@')[0])
                //add user to firebase db collection
                const userInfo = await addUserToCollection(
                    user.user.uid,user.user.email || '',
                    user.user.email?.split('@')[0] || '',
                    imageLink
                );

                //Store locally using redux and dispatch
                dispatch(setUser(userInfo))

                toastSuccess('You are now registered!');
                setLoading(false);
                reset();
                goTo('/dashboard')
            }).catch(err => {
                catchErr(err)
                setLoading(false)
            })
        } else {
            toastError('Passwords must match!');
            setLoading(false);
        }; 
    } else {
        toast.error("Fields shouln't be left empty!");
        setLoading(false);
    }; 
};

export const BE_signIn = (
    data: LoginQueryData, 
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    reset: () => void,
    goTo: NavigateFunction,
    dispatch: AppDispatch
) => {
    setLoading(true);
    if (data.email && data.password) {
        signInWithEmailAndPassword(auth, data.email, data.password)
        .then(async user => {
            //update user isOnline to true
            await updateUserStatus(user.user.uid)

            const userInfo = await getUserInfo(user.user.uid)
            dispatch(setUser(userInfo));
            setLoading(false);
            reset();
            toastSuccess('Successful login!');
            goTo('/dashboard')
        }).catch(err => {
            catchErr(err)
            setLoading(false)
        }) 
    } else {
        toast.error("Fields shouln't be left empty!");
        setLoading(false);
    }; 
};

export const BE_signOut = (dispatch:AppDispatch, goTo:NavigateFunction) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
        const userId = user.uid;

        signOut(auth).then(async() => {
            toastSuccess('Successful log out!');
            //Update isOnline to false
            await updateUserOnLogOut(userId);
        }).catch((err) => {
            catchErr(err);
        });
    }

    dispatch(setUser(defaultUser))
    localStorage.removeItem('user');
    goTo('/login')
};

const updateUserOnLogOut = async (id:string) => {
    const userRef = doc(db, usersCollection, id);

    try {
        await updateDoc(userRef, { isOnline: false });
    } catch (error) {
        console.error('Error updating user status:', error);
    }
};

const addUserToCollection = async (
    id:string,
    email: string,
    username: string,
    img:string,
) => {   
    await setDoc(doc(db, usersCollection, id), {
        isOnline: true,
        img,
        username,
        email,
        creationTime: serverTimestamp(),
        lastSeen: serverTimestamp(),
        bio: `Hi my name is ${username}`,
    });
    return getUserInfo(id)
};

const getUserInfo = async (id:string): Promise<userType> => {
    const userRef = doc(db, usersCollection, id);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        const {isOnline, username, email, img, creationTime, lastSeen, bio} = userSnap.data();
        return { 
            id: userSnap.id,    
            isOnline,
            username,
            email,
            img,
            creationTime: creationTime ? convertTime(creationTime.toDate()) : "No date yet",
            lastSeen : lastSeen ? convertTime(lastSeen.toDate()) : "No date yet",
            bio 
        };
    } else {
        toast.error("User not found!");
        return defaultUser;
    }
}

const updateUserStatus = async (id:string) => {
    const userRef = doc(db, usersCollection, id);
    const currentTime = serverTimestamp();

    await updateDoc(userRef, {
        lastSeen: currentTime,
        isOnline: true,
    });
    //getUpdatedStorageUser(id);
};

// const getUpdatedStorageUser = async(id:string): Promise<userType> => {
//     const userRef = doc(db, usersCollection, id);
//     const userSnap = await getDoc(userRef);

//     if (userSnap.exists()) {
//         const {isOnline, username, email, img, creationTime, lastSeen, bio} = userSnap.data();
//         return { 
//             id: userSnap.id,    
//             isOnline,
//             username,
//             email,
//             img,
//             creationTime: creationTime ? convertTime(creationTime.toDate()) : "No date yet",
//             lastSeen : lastSeen ? convertTime(lastSeen.toDate()) : "No date yet",
//             bio 
//         };
//     } else {
//         toast.error("User not found!");
//         return defaultUser;
//     }
// }
export const BE_addTaskList = async(dispatch:AppDispatch,id:string) => {
    const userRef = doc(db, usersCollection, id);
    const{title} = defaultTaskList
    const list = await addDoc(collection(db,taskListCollection),{
        title,
        userId: userRef.id
    })
    const newDocSnap =await getDoc(doc(db, list.path))

    if(newDocSnap.exists()) {
        const newlyAddedDoc:taskListType = {
            id:newDocSnap.id,
            title:newDocSnap.data().title
        }
        dispatch(addTaskList(newlyAddedDoc))
    } else {
        toastError("BE_addTaskList:No such doc")
    }
}

