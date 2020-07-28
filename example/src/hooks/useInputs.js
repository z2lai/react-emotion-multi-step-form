import { useContext } from "react";
import { FormContext } from "../context/FormContext";
import validateInput from '../logic/validateInput';

const useInputs = () => {
  console.log('useInputs called!');
  const { inputs, addInput, inputValues } = useContext(FormContext);

  const registerInput = (iconClassName, validationCriteria = { required: true }, height) => {
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
        input.node = node;
        addInput(input);
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