import { useContext } from "react";
import { FormContext } from "./FormContext";

const useInputs = () => {
  console.log('useInputs called!');
  const { inputs, addInput, inputValues } = useContext(FormContext);

  const validateInput = (name, value, criteria) => {
    console.log('validateInput called with name and value:');
    console.log(name);
    console.log(value);
    const {
      required, // boolean or error message string
      // minLength, // e.g. 3 or { value: 3, message: 'error message' }
      // maxLength, // e.g. 16 or { value: 16, message: 'error message' }
      // min, // e.g. 1
      // max, // e.g. 100
      // pattern, // `regex pattern`
      // validate // { validator: customValidatorFunc, message: customMessageFunc }
    } = criteria;

    const dataType = (Array.isArray(value) && 'array') ||
      ((typeof value === 'object') && 'object') ||
      'primitive';

    console.log(`input value data type: ${dataType}`);
    switch (dataType) {
      case 'array':
        if (required && value.length === 0) return (typeof required === 'string') ? required : `${name} required!`
        // Other criteria checks
        // ...
        break;
      case 'object':
        break;
      case 'primitive':
        if (required && !value.trim()) return (typeof required === 'string') ? required : `${name} is required!`
        // Other criteria checks
        // ...
        break;
      default:
        break;
    }
    return '';
  }

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