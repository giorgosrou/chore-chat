import React, {useState} from "react";
import Input from "./Input";
import Button from "./Button";
import { BE_signIn, BE_signUp } from "../Backend/Queries";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState("");
    const [registerLoading, setRegisterLoading] = useState(false);
    const goTo = useNavigate();
    const dispatch = useDispatch();

    const handleRegister = () => {
        const data = {email, password, validPassword}
        BE_signUp(data, setRegisterLoading , reset, goTo, dispatch)
    }

    const reset = () => {
        setEmail('');
        setPassword('');
        setValidPassword('');
    }

    return (
        <div className="w-full md:w-[450px]">
            <h1 className = "text-white text-center font-bold text-4xl md:text-6xl mb-10">
                Register
            </h1>
            <div className="flex flex-col gap-3 w-full bg-white p-6 min-h-[150px] rounded-lg drop-shadow-xl">
                <Input name = "email" type="email" value={email} onChange={(event)=>  setEmail(event.target.value)} />
                <Input name = "password" type="password" value = {password} onChange={(event)=> setPassword(event.target.value)} />
                <Input name = "confirm-password" value = {validPassword} type="password" onChange={(event)=>  setValidPassword(event.target.value)} />
                <>
                    <Button name = "Register" loading = {registerLoading} onClick={handleRegister} />
                    <Button name = "Login"  secondary onClick={() => goTo('/Login')} />
                </>
            </div>
        </div>
    )

}

export default Register;