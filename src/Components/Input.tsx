import React from "react";

type InputProps = {
    name: string,
    // value?:string
    type?: string
}

const Input = ({ name, type = "text" }: InputProps) => {
    return (
            <input
                type= {type}
                placeholder = {`Enter ${name}`}
                className="flex-1 placeholder-gray-300 bg-transparent px-3 py-1 border-2 border-gray-400 rounded-full " />
    )
}

export default Input;