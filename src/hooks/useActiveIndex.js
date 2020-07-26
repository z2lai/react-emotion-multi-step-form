import { useContext } from "react";

import { FormContext } from '../context/FormContext';

const useActiveIndex = () => {
  console.log('useActiveIndex called!');
  const { activeIndex, updateActiveIndex, activeInput, updateInputValues, isSubmitPage, error, setError } = useContext(FormContext);
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

  const setErrorMessage = message => {
    console.log(`setErrorMessage called with ${message}`);
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