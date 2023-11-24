import React from "react";
import Input from "./Input";
import Button from "./Button";

const Login = () => {

        return(
            <div className="w-full md:w-[450px]">
                <h1 className = "text-white text-center font-bold text-4xl md:text-6xl mb-10">
                    Login
                </h1>
                <div className="flex flex-col gap-3 w-full bg-white p-6 min-h-[150px] rounded-lg drop-shadow-xl">
                    <Input name = "email" type="email" />
                    <Input name = "password" type="password" />
                    <Button name = "Login"  secondary/>
                    <Button name = "Register" />
                </div>
            </div>
        )

}

export default Login;