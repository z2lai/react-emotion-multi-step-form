import { useState, useContext } from "react";

import { InputsContext } from '../context/InputsContext';
import useError from './useError';
import useInputs from './useInputs';

const useActiveInputIndex = () => {
  console.log('useActiveIndex called!');
  const { activeIndex, setActiveIndex, isSubmitPage, setIsSubmitPage } = useContext(InputsContext);
  const inputs = useInputs()[0];
  const setErrorMessage = useError()[1];

  const changeActiveIndex = index => {
    console.log('changeActiveIndex called!')
    console.log(inputs);
    const isNextIndex = index > activeIndex;
    /* 
      1. Focus Input or FormBody
      2. setErrorMessage 
    */
    if (isNextIndex) {
      const input = inputs[activeIndex]; 
      const errorMessage = input.validate();
      if (errorMessage) {
        input.node.focus();
        return setErrorMessage(errorMessage);
      }
    }
    setErrorMessage('');
    setActiveIndex(index);
    if (index === inputs.length) {
      setIsSubmitPage(true);
    } else {
      setIsSubmitPage(false) 
    }
  }

  return [
    activeIndex,
    changeActiveIndex,
    isSubmitPage,
  ]
}

export default useActiveInputIndex;