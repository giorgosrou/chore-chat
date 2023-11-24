import React from "react";
import Spinner from "./Spinner";

type ButtonProps = {
    name?: string;
    color?: string;
    secondary?: boolean;
    loading?: boolean;
    onClick?:() => void;
}

const Button = ({
    name = "Button",
    secondary = false,
    loading = false,
    onClick
}: ButtonProps) => {
    return (
        <button className = {`rounded-full flex justify-center gap-3 items-center py-2 px-9 text-white border-2 border-white ${secondary? " bg-mypink": "bg-gray-dark"} 
        font-bold hover:bg-mypink transition-all hover:drop-shadow-lg`}
        disabled = {loading}
        onClick={onClick}
        >
            {loading && <Spinner />}
            {name}
        </button>
    )
}

export default Button;