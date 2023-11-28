import React, {useState} from "react";
import Input from "./Input";
import Button from "./Button";
import { BE_signIn, BE_signUp } from "../Backend/Queries";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState("");
    const [registerLoading, setRegisterLoading] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);
    const goTo = useNavigate();

    const handleRegister = () => {
        const data = {email, password, validPassword}
        console.log(data)
        BE_signUp(data, setRegisterLoading , reset, goTo)
    }

    const handleSignIn = () => {
        const data = { email, password, validPassword}
        console.log(data)
        BE_signIn(data, setLoginLoading , reset, goTo)
    }

    const reset = () => {
        setEmail('');
        setPassword('');
        setValidPassword('');
    }


    return (
        <div className="w-full md:w-[450px]">
            <h1 className = "text-white text-center font-bold text-4xl md:text-6xl mb-10">
                {isLoggedIn? "Login": "Register"}
            </h1>
            <div className="flex flex-col gap-3 w-full bg-white p-6 min-h-[150px] rounded-lg drop-shadow-xl">
                <Input name = "email" type="email" value={email} onChange={(event)=>  setEmail(event.target.value)} />
                <Input name = "password" type="password" value={password} onChange={(event)=> setPassword(event.target.value)} />
                {!isLoggedIn && <Input name = "confirm-password" value={validPassword} type="password" onChange={(event)=>  setValidPassword(event.target.value)} />}
                {isLoggedIn
                    ?
                        <>
                            <Button name = "Login" loading = {loginLoading} onClick = {handleSignIn} />
                            <Button name = "Register" secondary onClick={() => setIsLoggedIn(false)} />
                        </>
                    :
                        <>
                            <Button name = "Register" loading = {registerLoading} onClick={handleRegister} />
                            <Button name = "Login"  secondary onClick={() => setIsLoggedIn(true)} />
                        </>
                }
            </div>
        </div>
    )

}

export default Login;