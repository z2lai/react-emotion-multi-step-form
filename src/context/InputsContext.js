import React, { createContext, useState, useEffect, useRef } from "react";

export const InputsContext = createContext({});

export const InputsProvider = props => {
  const {
    children,
    // inputs: initialInputs,
  } = props;
  const [inputs, setInputs] = useState([]); // setInputs causes a re-render of all children of InputsProvider. setInputs should only be called on initial render of entire application when each input is registered.
  const [inputValues, setInputValues] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [error, setError] = useState({
    state: false,
    message: ''
  })
  const [isSubmitPage, setIsSubmitPage] = useState(false);

  const inputsRef = useRef({}); // to store and update inputs without calling setInputValues in order to avoid unnecessary re-rendering

  const addInput = input => {
    const name = input.node.name || input.node.dataset.name;
    if (!inputsRef.current.hasOwnProperty(name)) {
      input.name = name;
      inputsRef.current[name] = input;
      console.log('input registered! inputsref.current:')
      console.log(inputsRef.current)
    }
  }

  const updateInputs = () => {
    const inputsArray = Object.values(inputsRef.current); // need to change inputs to a set to guaruntee order when converted to array
    console.log('setInputs to be called with inputsArray:')
    console.log(inputsArray);
    setInputs(inputsArray);
  }

  useEffect(() => {
    console.log('inputsRef Effect fired!');
    console.log(inputsRef.current);
    updateInputs();
  }, [inputsRef.current]); // only gets called when new inputs are added, not when existing inputs are updated

  const updateInputValues = () => {
    const newInputValues = {};
    inputs.map(input => {
      const valueShallowCopy = Array.isArray(input.value) && [...input.value] ||
        (typeof input.value === 'object') && { ...input.value } ||
        input.value
      newInputValues[input.name] = valueShallowCopy;
    });
    console.log('setInputValues called with:')
    console.log(newInputValues);
    setInputValues(newInputValues);
  }

  const inputsContext = {
    inputsRef,
    addInput,
    inputs,
    inputValues,
    updateInputValues,
    activeIndex,
    setActiveIndex,
    error,
    setError,
    isSubmitPage,
    setIsSubmitPage,
  }

  return <InputsContext.Provider value={inputsContext}>{children}</InputsContext.Provider>;
};