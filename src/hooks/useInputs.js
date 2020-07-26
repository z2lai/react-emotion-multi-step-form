import { useContext } from "react";
import { FormContext } from "../context/FormContext";
import validateInput from '../logic/validateInput';

const useInputs = () => {
  console.log('useInputs called!');
  const { inputs, addInput, inputValues } = useContext(FormContext);

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
    registerInput,
    inputs,
    inputValues,
  }
}

export default useInputs;