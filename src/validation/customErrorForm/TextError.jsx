// its text validation error
import React from "react";

const TextError = (props) => {
    return (
        <div className="text-sm text-rose-600">
            {props.children}
        </div>
    )
};

export default TextError;