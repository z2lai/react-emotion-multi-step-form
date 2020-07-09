import React, { useState, useRef, useCallback, useEffect } from "react";
import validateInput from './logic/validateInput';

const useForm = () => {
  console.log('useForm called!');
  const inputs = useRef([]);
  const inputObj = useRef({});
  const setRef = useCallback(node => {
    if (node) {
      const input = {...inputObj.current}
      input.node = node;
      inputs.current.push(input)
    }
  }, []);

  const registerInput = (inputName, iconClassName, validationCriteria = { required: true }) => {
    // associate page number, icon, input validation, error message and focusing input ref on error
    inputObj.current = {
      inputName,
      iconClassName,
      validationCriteria,
      validate: function () {
        return validateInput(this.node, this.validationCriteria);
      },
    }
    return setRef;
  }

  return {
    registerInput,
    inputs: inputs.current,
  }
}

export default useForm;