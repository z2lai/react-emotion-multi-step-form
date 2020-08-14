import { useContext } from "react";

import { FormContext } from './FormContext';

const useActiveIndex = () => {
  // console.log('useActiveIndex called!');
  const { activeIndex, updateActiveIndex, activeInput, updateInputValues, isSubmitPage, error, setError } = useContext(FormContext);

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
    updateActiveIndex(index);
  }

  const setErrorMessage = message => {
    // console.log(`setErrorMessage called with ${message}`);
    if (message) {
      setError({ state: true, message });
    } else {
      setError({ state: false, message: '' });
    }
  }

  return {
    activeIndex,
    changeActiveIndex,
    activeInput,
    error,
    setErrorMessage,
    isSubmitPage,
  }
}

export default useActiveIndex;