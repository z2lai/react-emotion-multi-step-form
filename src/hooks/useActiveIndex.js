import { useState, useContext } from "react";

import { InputsContext } from '../context/InputsContext';
import useError from './useError';

const useActiveInputIndex = () => {
  console.log('useActiveIndex called!');
  const { inputs, activeIndex, setActiveIndex } = useContext(InputsContext);
  const [error, setErrorMessage] = useError(); // error state is private and cannot be shared by multiple components

  const changeActiveIndex = index => {
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
  }

  return [
    activeIndex,
    changeActiveIndex,
    error,
  ]
}

export default useActiveInputIndex;