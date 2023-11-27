import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebase";
import { ToastContainer, toast } from 'react-toastify';
import { toastError, toastSuccess } from "../Utils/toasts";
import { catchErr } from "../Utils/catchErr";


type QueryData = {
    email: string;
    password: string;
    validPassword: string;
}

export const BE_signUp = (data: QueryData, setLoading: React.Dispatch<React.SetStateAction<boolean>>, reset: () => void) => {
    setLoading(true);
    if (data.email && data.password) {
        if (data.password === data.validPassword) {
            createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(userCredentials => {
                toastSuccess('You are now registered!');
                console.log(userCredentials)
                setLoading(false);
                reset();
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