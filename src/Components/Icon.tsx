import React from "react";
import { IconType } from "react-icons";

type IconProps = {
    IconName: IconType;
    size?: number;
    className?:string;
    loading?: boolean;
    ping?: boolean;
    reduceOpacityOnHover?:boolean;
    onClick?: () => void;
};

const Icon = ({
    IconName,
    size = 20,
    className,
    ping,
    reduceOpacityOnHover,
    onClick
}:IconProps) => {
    return(
        <button
            onClick={onClick}
            className = {`p-3 rounded-full cursor-pointer ${
            reduceOpacityOnHover
            ? "hover:bg-opacity-30" 
            : "bg-myblue text-white border-2 border-white hover:drop-shadow-lg"} ${className}`}
        >
            {<IconName />}
        </button>
    );
}

export default Icon;