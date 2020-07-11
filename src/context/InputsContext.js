import React, { createContext, useState, useEffect } from "react";

export const InputsContext = createContext({});

export const InputsProvider = props => {
    const { 
        children, 
        // inputs: initialInputs,
    } = props;
    const [inputs, setInputs] = useState([]); // setInputs causes a re-render of all children of InputsProvider
    const [activeIndex, setActiveIndex] = useState(0);
    const [error, setError] = useState({
        state: false,
        message: ''
    })

    const inputsContext = {
        inputs,
        setInputs,
        activeIndex,
        setActiveIndex,
        error,
        setError,
    }

    return <InputsContext.Provider value={inputsContext}>{children}</InputsContext.Provider>;
};