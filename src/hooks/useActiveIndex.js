import { useState, useEffect, useRef, useContext } from "react";

import { InputsContext } from '../context/InputsContext';
import useError from './useError';
import useInputs from './useInputs';

const useActiveIndex = () => {
  console.log('useActiveIndex called!');
  const { activeIndex, updateActiveIndex, activeInput, updateInputValues, isSubmitPage } = useContext(InputsContext);
  const setErrorMessage = useError()[1];
  // const [ activeInput, setActiveInput ] = useState(null);

  // useEffect(() => {
  //   console.log('useActiveIndex effect ran to possibly setActiveInput');
  //   const input = getInput(activeIndex);
  //   console.log('activeInput:');
  //   console.log(input);
  //   if (input) setActiveInput(input);
  // }, [getInput, activeIndex]);

  const changeActiveIndex = index => {
    console.log(`changeActiveIndex called with index: ${index}`);
    // Validate input if moving to one of the next pages
    const isNextIndex = index > activeIndex;
    if (isNextIndex) {
      const errorMessage = activeInput.validate();
      if (errorMessage) {
        activeInput.node.focus();
        return setErrorMessage(errorMessage);
      }
    }
    // If no error on input validation, then update global state for inputValues
    updateInputValues();
    setErrorMessage('');
    updateActiveIndex(index);
  }

  return {
    activeIndex,
    changeActiveIndex,
    activeInput,
    isSubmitPage,
  }
}

export default useActiveIndex;