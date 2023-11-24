import React from "react";

type ButtonProps = {
    name?: string,
    color?: string
    secondary?: boolean
}

const Button = ({
    name = "Button",
    secondary = false,
}: ButtonProps) => {
    return (
        <button className ={`rounded-full py-2 px-9 text-white border-2 border-white ${secondary? "bg-myblue": "bg-mypink"} font-bold cursor-pointer hover:bg-mypink transition-all hover:drop-shadow-lg`}>
            {name}
        </button>
    )
}

export default Button;