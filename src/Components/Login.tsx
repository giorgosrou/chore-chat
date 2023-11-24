import React, {useState} from "react";
import Input from "./Input";
import Button from "./Button";

const Login = () => {

    const [isLoggedIn, setisLoggedIn] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState("");

    const handleRegister = () => {
        const data = {email, password, validPassword}
        console.log(data)
    }

    const handleSignIn = () => {
        const data = { email, password}
        console.log(data)
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
                            <Button name = "Login"   onClick={handleSignIn} />
                            <Button name = "Register" secondary onClick={() => setisLoggedIn(false)} />
                        </>
                    :
                        <>
                            <Button name = "Register" onClick={handleRegister} />
                            <Button name = "Login"  secondary onClick={() => setisLoggedIn(true)} />
                        </>
                }
            </div>
        </div>
    )

}

export default Login;