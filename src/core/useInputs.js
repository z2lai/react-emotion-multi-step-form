import { useContext } from "react";

import { FormContext } from './FormContext';

const useInputs = () => {
  const { 
    inputs, 
    activeIndex, 
    setActiveIndex, 
    activeInput, 
    error, 
    setError, 
    isSubmitPage, 
    inputValues, 
    setInputValues 
  } = useContext(FormContext);

  const changeActiveIndex = index => {
    const isNextIndex = index > activeIndex;
    if (isNextIndex) {
      const errorMessage = activeInput.validate();
      if (errorMessage) {
        activeInput.node.focus();
        return setErrorMessage(errorMessage);
      }
    }
    updateInputValues();
    setErrorMessage('');
    setActiveIndex(index);
  }

  const setErrorMessage = message => {
    if (message) {
      setError({ state: true, message });
    } else {
      setError({ state: false, message: '' });
    }
  }

  const updateInputValues = () => {
    const newInputValues = { ...inputValues };
    inputs.forEach(input => {
      const valueShallowCopy = (Array.isArray(input.value) && [...input.value]) ||
        // ((typeof input.value === 'object') && { ...input.value }) ||
        input.value.trim();
      newInputValues[input.name] = valueShallowCopy.length > 0 ? valueShallowCopy : null;
    });
    setInputValues(newInputValues);
  }

  return {
    inputs,
    activeIndex,
    changeActiveIndex,
    activeInput,
    error,
    setErrorMessage,
    isSubmitPage,
    inputValues,
  }
}

export default useInputs;