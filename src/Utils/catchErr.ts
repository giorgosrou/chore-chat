import { toast } from "react-toastify"
import { toastError } from "./toasts"

type Error = {
    code?: string
}

export const catchErr = (err: Error) => {
    console.log (err.code)
    if (err.code === "auth/invalid-email") {
        toast.error("Invalid Email!");
    } else if (err.code === "auth/weak-password") {
        toast.error("Password should be at least 6 characters!");
    } else if (err.code === "auth/user-not-found") {
        toast.error("User not found");
    } else if (err.code === "auth/email-already-in-use") {
        toast.error("Email already exists");
    } else if (err.code === "auth/wrong-password") {
        toast.error("Wrong password or email");
    } else if (err.code === "auth/requires-recent-login") {
        toast.error("Logout and login before updating your profile");
    } else if (err.code === "unavailable") {
        toast.error("Firebase is unavailable");
    } else if (err.code === "auth/invalid-login-credentials") {
        toast.error("Invalid credentials!");
    } else {
        toast.error("An error occured!");
    }
    
}