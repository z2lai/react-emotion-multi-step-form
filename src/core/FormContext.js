import React, { createContext, useState, useEffect, useRef, useCallback } from "react";

export const FormContext = createContext({});

export const FormProvider = props => {
  console.log('InputsProvider rendered!');
  const {
    children,
    // inputs: initialInputs,
  } = props;
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
      console.log('input registered! inputsref.current:')
      console.log(inputsRef.current)
    }
  }

  const updateInputs = () => {
    const inputsArray = Object.values(inputsRef.current); //? Need to change inputs to a set to guaruntee order when converted to array?
    console.log('setInputs to be called with inputsArray:')
    console.log(inputsArray);
    setInputs(inputsArray);
  }

  const getInput = useCallback(identifier => {
    if (inputs.length === 0) return null;
    if (typeof identifier === 'string') return inputsRef.current[identifier] || null;
    else if (typeof identifier === 'number') return (identifier < inputs.length && inputs[identifier]) || null;
  }, [inputs]);

  const updateActiveIndex = index => {
    console.log(`activeIndex to be updated to: ${index}`)
    setActiveIndex(index);
  }

  const updateInputValues = () => {
    const newInputValues = { ...inputValues };
    inputs.forEach(input => {
      const valueShallowCopy = (Array.isArray(input.value) && [...input.value]) ||
        ((typeof input.value === 'object') && { ...input.value }) ||
        input.value.trim();
      console.log('valueShallowCopy:');
      console.log(valueShallowCopy);
      newInputValues[input.name] = valueShallowCopy;
    });
    console.log('setInputValues called with:')
    console.log(newInputValues);
    setInputValues(newInputValues);
  }

  const activeInput = getInput(activeIndex);
  const isSubmitPage = inputs.length > 0 && activeIndex === inputs.length;

  // This effect runs in the commit phase. Ref callbacks are invoked to register inputs in the commit phase as well but before these effects run.
  useEffect(() => {
    console.log('inputsRef Effect fired!');
    console.log(inputsRef.current);
    updateInputs();
  }, []);

  const formContext = {
    inputs,
    addInput,
    getInput,
    inputValues,
    updateInputValues,
    activeIndex,
    updateActiveIndex,
    activeInput,
    error,
    setError,
    isSubmitPage,
  }

  return <FormContext.Provider value={formContext}>{children}</FormContext.Provider>;
};