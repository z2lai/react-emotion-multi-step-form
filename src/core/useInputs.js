import { useContext } from "react";

import { FormContext } from './FormContext';

const useInputs = () => {
  // console.log('useActiveIndex called!');
  const { inputs, activeIndex, setActiveIndex, activeInput, error, setError, isSubmitPage, inputValues, setInputValues } = useContext(FormContext);

  const changeActiveIndex = index => {
    // console.log(`changeActiveIndex called with index: ${index}`);
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
    // console.log(`setErrorMessage called with ${message}`);
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
      // console.log('valueShallowCopy:');
      // console.log(valueShallowCopy);
      newInputValues[input.name] = valueShallowCopy.length > 0 ? valueShallowCopy : null;
    });
    console.log('setInputValues called with:')
    console.log(newInputValues);
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