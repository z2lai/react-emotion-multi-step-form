import { useState, useRef, useEffect, useContext } from "react";
import { InputsContext } from "../context/InputsContext";
import validateInput from '../logic/validateInput';

const useInputs = (name, initialValue, handleChange) => {
  console.log('useInputs called!');
  const { inputs, addInput, inputsRef } = useContext(InputsContext);
  const [value, setValue] = useState(initialValue);

  // const getInput = name => {
  //   return inputsRef.current[name];
  // }

  useEffect(() => {
    console.log('useInputs effect called');
    if (handleChange) handleChange(value);
    const input = inputsRef.current[name]
    if (input) {
      console.log('input to be updated with:');
      console.log(value);
      input.value = value;
      console.log(input);
    }
  }, [value])

  // const inputsRef = useRef({});
  // console.log(inputsRef.current);
  // const inputsTempRef = useRef({});
  // const setRef = useCallback(node => {
  //   if (node) {
  //     const input = {...inputObj.current}
  //     input.node = node;
  //     inputsRef.current.push(input)
  //   }
  // }, []);

  // useEffect(() => {
  //   console.log('inputsRef Effect fired!');
  //   console.log(inputsRef.current);
  //   const inputsArray = Object.values(inputsRef.current); // need to change inputs to a set to guaruntee order when converted to array
  //   console.log('setInputs to be called with inputsArray:')
  //   console.log(inputsArray);
  //   setInputs(inputsArray);
  // }, [inputsRef.current]);

  const registerInput = (iconClassName, validationCriteria = { required: true }, height) => {
    // if (inputsRef.current.hasOwnProperty(inputName)) {
    //   console.log('register input skipped!');
    //   return;
    // }
    // associate page number, icon, input validation, error message and focusing input ref on error
    const input = {
      iconClassName,
      height,
      validationCriteria,
      validate: function () {
        return validateInput(this.name, this.value, this.validationCriteria);
      },
    }
    return node => {
      console.log('Ref callback run with node:');
      console.log(node);
      if (node) {
        console.log(node.name);
        console.log(node.dataset.name);
        input.node = node;
        addInput(input);
        // inputsRef.current[node.name] = input;
        // console.log('input registered! inputsref.current:')
        // console.log(inputsRef.current)
      }
    };
  }

  return {
    inputs,
    registerInput,
    value,
    setValue,
  }
}

export default useInputs;