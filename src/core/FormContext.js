import React, { createContext, useState, useEffect, useRef, useCallback } from "react";

export const FormContext = createContext({});

export const FormProvider = ({ children }) => {
  const [inputs, setInputs] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [error, setError] = useState({
    state: false,
    message: ''
  })

  const inputsRef = useRef({});

  const addInput = input => {
    const name = input.node.name || input.node.dataset.name;
    if (!inputsRef.current.hasOwnProperty(name)) {
      input.name = name;
      inputsRef.current[name] = input;
    }
  }

  const getInput = useCallback(identifier => {
    if (inputs.length === 0) return null;
    if (typeof identifier === 'string') return inputsRef.current[identifier] || null;
    else if (typeof identifier === 'number') return (identifier < inputs.length && inputs[identifier]) || null;
  }, [inputs]);

  const activeInput = getInput(activeIndex);
  const isSubmitPage = inputs.length > 0 && activeIndex === inputs.length;

  useEffect(() => {
    // This effect runs in the commit phase after all Ref callbacks are invoked 
    // (in the commit phase as well) to add inputs to inputsRef.current
    const updateInputs = () => {
      const inputsArray = Object.values(inputsRef.current);
      setInputs(inputsArray);
    }
    updateInputs();
  }, [setInputs, inputsRef.current]);

  const formContext = {
    inputs,
    addInput,
    getInput,
    inputValues,
    setInputValues,
    activeIndex,
    setActiveIndex,
    activeInput,
    error,
    setError,
    isSubmitPage,
  }

  return <FormContext.Provider value={formContext}>{children}</FormContext.Provider>;
};