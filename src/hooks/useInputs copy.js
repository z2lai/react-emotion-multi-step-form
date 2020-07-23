import { useState, useRef, useEffect, useContext } from "react";
import { InputsContext } from "../context/InputsContext";
import validateInput from '../logic/validateInput';

const useInputs = (name, initialValue, handleChange) => {
  console.log('useInputs called!');
  const { inputs, addInput, getInput, inputValues } = useContext(InputsContext);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    console.log(`useInputs effect called for ${name}`);
    if (handleChange) handleChange(value);
    const input = getInput(name);
    if (input) {
      console.log('input to be updated with:');
      console.log(value);
      input.value = value;
    }
  }, [value])

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
    inputValues,
  }
}

export default useInputs;