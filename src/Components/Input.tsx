import React from "react";

type InputProps = {
    name: string;
    value?:string;
    type?: string;
    onChange?:(e: any) => void;
}

const Input = ({ name, type = "text", value, onChange }: InputProps) => {
    return (
            <input
                value={value}
                onChange={onChange}
                type= {type}
                placeholder = {`Enter ${name}`}
                className="flex-1 placeholder-gray-300 bg-transparent px-3 py-1 border-2 border-gray-400 rounded-full "
                
            />
                
    );
};

export default Input;