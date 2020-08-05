import React from "react";

import useInputs from "../core/useInputs";
import useInputState from "../core/useInputState";

import InputWrapper from "./InputWrapper";
import { StyledInput } from "./StyledComponents";

const TextInput = ({ name, placeholder, onChange, height, iconClassName, validationRules}) => {
  console.log('TextInput rendered!');
  const { refCallback } = useInputs(iconClassName, validationRules, height);
  const { value, setValue } = useInputState(name, '');

  const handleChange = event => {
    const value = event.target.value;
    if (onChange) onChange(value);
    setValue(value);
  }


  return (
    <InputWrapper name={name}>
      <StyledInput
        type="text"
        name={name}
        ref={refCallback}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </InputWrapper>
  );
};

export default TextInput;