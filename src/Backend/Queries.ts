import { createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebase";
import { ToastContainer, toast } from 'react-toastify';
import { toastError, toastSuccess } from "../Utils/toasts";
import { catchErr } from "../Utils/catchErr";
import { NavigateFunction } from "react-router-dom";


type RegisterQueryData = {
    email: string;
    password: string;
    validPassword: string;
}

type LoginQueryData = {
    email: string;
    password: string;
}

export const BE_signUp = (data: RegisterQueryData, setLoading: React.Dispatch<React.SetStateAction<boolean>>, 
    reset: () => void, goTo: NavigateFunction) => {
    setLoading(true);
    if (data.email && data.password) {
        if (data.password === data.validPassword) {
            createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(userCredentials => {
                toastSuccess('You are now registered!');
                console.log(userCredentials)
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

export const BE_signIn = (data: LoginQueryData, setLoading: React.Dispatch<React.SetStateAction<boolean>>,
     reset: () => void, goTo: NavigateFunction) => {
    setLoading(true);
    if (data.email && data.password) {
        signInWithEmailAndPassword(auth, data.email, data.password)
        .then(userCredentials => {
            toastSuccess('Successful login!');
            console.log(userCredentials)
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