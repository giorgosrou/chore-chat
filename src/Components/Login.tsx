import React, {useEffect, useState} from "react";
import Input from "./Input";
import Button from "./Button";
import { BE_signIn } from "../Backend/Queries";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/userSlice";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginLoading, setLoginLoading] = useState(false);
    const goTo = useNavigate();
    const dispatch = useDispatch();    
    const localStorageUser = JSON.parse(localStorage.getItem('user') || '{}');
   
    useEffect(() => {
        if (localStorageUser && localStorageUser.id) {
            dispatch(setUser(localStorageUser));
            goTo('/dashboard');
        }
      },[]);

    const handleSignIn = () => {
        const data = { email, password}
        BE_signIn(data, setLoginLoading , reset, goTo, dispatch)
    }

    const reset = () => {
        setEmail('');
        setPassword('');
    }

    return (
        <div className="w-full md:w-[450px]">
            <h1 className = "text-white text-center font-bold text-4xl md:text-6xl mb-10">
                Login
            </h1>
            <div className="flex flex-col gap-3 w-full bg-white p-6 min-h-[150px] rounded-lg drop-shadow-xl">
                <Input name = "email" type="email" value={email} onChange={(event)=>  setEmail(event.target.value)} />
                <Input name = "password" type="password" value={password} onChange={(event)=> setPassword(event.target.value)} />
                <>
                    <Button name = "Login" loading = {loginLoading} onClick = {handleSignIn} />
                    <Button name = "Register" secondary onClick={() => goTo('/register')} />
                </>
            </div>
        </div>
    )

}

export default Login;