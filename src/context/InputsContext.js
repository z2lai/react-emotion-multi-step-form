import React, { createContext, useState, useEffect, useRef, useCallback } from "react";

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

  const inputsRef = useRef({}); // to store and update inputs without calling setInputValues in order to avoid unnecessary re-rendering
  // const getInputRef = useRef(null);

  // // This effect only runs after each input registration and does not run after all inputs have been registered
  // useEffect(() => {
  //   console.log('inputs effect fired')
  //   if (inputs.length > 0) {
  //     console.log('inputs effect to populate getInput function:');
  //     const getInput = identifier => {
  //       if (typeof identifier === 'string') return inputsRef.current[identifier] || null;
  //       else if (typeof identifier === 'number') return (inputs.length > 0 && identifier < inputs.length) && inputs[identifier] || null;
  //     }
  //     getInputRef.current = getInput;
  //     console.log(getInputRef.current);
  //   }
  // }, [inputs]);

  const getInput = useCallback(identifier => {
    if (inputs.length === 0) return null;
    else {
      if (typeof identifier === 'string') return inputsRef.current[identifier] || null;
      else if (typeof identifier === 'number') return (inputs.length > 0 && identifier < inputs.length) && inputs[identifier] || null;
    }
  }, [inputs]);

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

  const updateActiveIndex = index => {
    if (index === inputs.length) {
      // setIsSubmitPage(true);
    } else {
      // setIsSubmitPage(false);
      setActiveIndex(index);
      // console.log('node to be focused:');
      // console.log(inputs[index].node);
      // setTimeout(() => inputs[index].node.focus(), 3000);
    }
  }

  const updateInputValues = () => {
    const newInputValues = {};
    inputs.map(input => {
      const valueShallowCopy = (Array.isArray(input.value) && [...input.value]) ||
        ((typeof input.value === 'object') && { ...input.value }) ||
        input.value;
      console.log('valueShallowCopy:');
      console.log(valueShallowCopy);
      newInputValues[input.name] = valueShallowCopy;
    });
    console.log('setInputValues called with:')
    console.log(newInputValues);
    setInputValues(newInputValues);
  }

  const inputsContext = {
    inputs,
    addInput,
    getInput,
    inputValues,
    updateInputValues,
    activeIndex,
    updateActiveIndex,
    error,
    setError,
    // isSubmitPage,
    // setIsSubmitPage,
  }

  return <InputsContext.Provider value={inputsContext}>{children}</InputsContext.Provider>;
};