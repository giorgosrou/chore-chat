import { createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./Firebase";
import { ToastContainer, toast } from 'react-toastify';
import { toastError, toastSuccess } from "../Utils/toasts";
import { catchErr } from "../Utils/catchErr";
import { Form, NavigateFunction } from "react-router-dom";
import { DocumentData, DocumentReference, doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { userType } from "../Types";
import { defaultUser, setUser } from "../Redux/userSlice";
import convertTime from "../Utils/convertTime";
import avatarGenerator from "../Utils/avatarGenerator";
import { Dispatch } from "react";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { AppDispatch } from "../Redux/store";


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

export const BE_signUp = async(
    data: RegisterQueryData,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>, 
    reset: () => void,
    goTo: NavigateFunction,
    dispatch: AppDispatch,
) => {
    setLoading(true);
    if (data.email && data.password) {
        if (data.password === data.validPassword) {
            await createUserWithEmailAndPassword(auth, data.email, data.password)
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
        .then(user => {
            toastSuccess('Successful login!');
            //update user isOnline to true

            const userInfo = getUserInfo(user.user.uid)
            //Store locally using redux and dispatch
            dispatch(setUser(userInfo));
            setLoading(false);
            reset();
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
        ProfileEffectiveDate: serverTimestamp(),
        lastSeen: serverTimestamp(),
        bioDescription: `Hi my name is ${username}`,
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
            creationTime,//: creationTime ? convertTime(creationTime.toDate()) : "No date yet",
            lastSeen,//: lastSeen ? convertTime(lastSeen.toDate()) : "No date yet",
            bio  
        };
    } else {
        toast.error("User not found!");
        return defaultUser;
    }
}
