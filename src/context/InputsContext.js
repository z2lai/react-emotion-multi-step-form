import React, { createContext, useState, useEffect, useRef } from "react";

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
  const inputsRef = useRef({});

  useEffect(() => {
    console.log('inputsRef Effect fired!');
    console.log(inputsRef.current);
    const inputsArray = Object.values(inputsRef.current); // need to change inputs to a set to guaruntee order when converted to array
    console.log('setInputs to be called with inputsArray:')
    console.log(inputsArray);
    setInputs(inputsArray);
  }, [inputsRef.current]);

  const updateInputs = input => {
    if (!inputsRef.current.hasOwnProperty(input.node.name)) {
      inputsRef.current[input.node.name] = input;
      console.log('input registered! inputsref.current:')
      console.log(inputsRef.current)
    }
  }

  const inputsContext = {
    inputs,
    updateInputs,
    activeIndex,
    setActiveIndex,
    error,
    setError,
  }

  return <InputsContext.Provider value={inputsContext}>{children}</InputsContext.Provider>;
};