import { useState, useEffect, useContext } from "react";

import { InputsContext } from '../context/InputsContext';

const useError = () => {
  console.log('useError called!');
  const { error, setError } = useContext(InputsContext);

  useEffect(() => {
    console.log('useError Effect run with new error:');
    console.log(error);
  }, [error])

  const setErrorMessage = message => {
    console.log(`setErrorMessage called with ${message}`);
    if (message) {
      setError({ state: true, message });
    } else {
      setError({ state: false, message: '' });
    }
  }

  return [
    error,
    setErrorMessage,
  ]
}

export default useError;