import { createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./Firebase";
import { ToastContainer, toast } from 'react-toastify';
import { toastError, toastSuccess } from "../Utils/toasts";
import { catchErr } from "../Utils/catchErr";
import { NavigateFunction } from "react-router-dom";
import { DocumentData, DocumentReference, doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { userType } from "../Types";
import { defaultUser } from "../Redux/userSlice";


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

export const BE_signUp = (
    data: RegisterQueryData,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>, 
    reset: () => void,
    goTo: NavigateFunction
) => {
    setLoading(true);
    if (data.email && data.password) {
        if (data.password === data.validPassword) {
            createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(user => {
                
                //todo: set image

                const userInfo = addUserToCollection(user.user.uid,user.user.email || '', user.user.email?.split('@')[0] || '','user.imgURL')

                //todo: setUser info to store and local store
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
    goTo: NavigateFunction
) => {
    setLoading(true);
    if (data.email && data.password) {
        signInWithEmailAndPassword(auth, data.email, data.password)
        .then(user => {
            toastSuccess('Successful login!');

            //update user isOnline to true

            const userInfo = getUserInfo(user.user.uid)

            //set user to store!
            
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

// Fetch the user from collection
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
            creationTime,
            lastSeen,
            bio  
        };
    } else {
        toast.error("User not found!");
        return defaultUser;
    }
}
