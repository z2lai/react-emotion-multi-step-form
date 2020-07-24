import React, { createContext, useState, useEffect, useRef, useCallback } from "react";

export const InputsContext = createContext({});

export const InputsProvider = props => {
  console.log('InputsProvider rendered!');
  const {
    children,
    // inputs: initialInputs,
  } = props;
  const [inputs, setInputs] = useState([]); // setInputs causes a re-render of all children of InputsProvider. setInputs is only called on initial renders of entire application when each input is registered and the effect is fired after a re-render
  const [inputValues, setInputValues] = useState({}); // only gets called from changeActiveIndex event handler
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
    // if (!identifer) return (activeIndex < inputs.length && inputs[activeIndex]) || null;
    if (typeof identifier === 'string') return inputsRef.current[identifier] || null;
    else if (typeof identifier === 'number') return (identifier < inputs.length && inputs[identifier]) || null;
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

  const updateActiveIndex = index => {
    console.log(`activeIndex to be updated to: ${index}`)
    setActiveIndex(index);
    // if (index === inputs.length) {
    //   // setIsSubmitPage(true);
    // } else {
    //   // setIsSubmitPage(false);
    //   setActiveIndex(index);
    //   // console.log('node to be focused:');
    //   // console.log(inputs[index].node);
    //   // setTimeout(() => inputs[index].node.focus(), 3000);
    // }
  }

  const updateInputValues = () => {
    const newInputValues = {...inputValues};
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

  // activeInput will be null on initial render. This is the flag that should be checked to determine if all inputs have been registered
  // before any setState can be called on initial render to trigger a re-render of the entire component tree
  const activeInput = getInput(activeIndex);
  // These two exported variables don't need to be stored in useRef as they should be shared (like global/shared state) between every call/render of InputsProvider
  const isSubmitPage = inputs.length > 0 && activeIndex === inputs.length;

  // Effects run in the commit phase, ref callbacks are invoked in the commit phase as well but before effects
  useEffect(() => {
    console.log('inputsRef Effect fired!');
    console.log(inputsRef.current);
    updateInputs();
  }, [inputsRef.current]); // only gets called when new inputs are added, not when existing inputs are updated

  const inputsContext = {
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

  return <InputsContext.Provider value={inputsContext}>{children}</InputsContext.Provider>;
};