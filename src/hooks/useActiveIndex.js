import { useState, useEffect, useRef, useContext } from "react";

import { InputsContext } from '../context/InputsContext';
import useError from './useError';
import useInputs from './useInputs';

const useActiveIndex = () => {
  console.log('useActiveIndex called!');
  const { getInput, activeIndex, updateActiveIndex, updateInputValues } = useContext(InputsContext);
  const setErrorMessage = useError()[1];
  const [ activeInput, setActiveInput ] = useState(null);

  useEffect(() => {
    console.log('useActiveIndex effect ran to possibly setActiveInput');
    console.log(getInput);
    const input = getInput(activeIndex);
    if (input) setActiveInput(input);
  }, [getInput, activeIndex]);

  const changeActiveIndex = index => {
    console.log('changeActiveIndex called!')
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
  }
}

export default useActiveIndex;