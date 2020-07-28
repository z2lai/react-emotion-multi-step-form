import React from "react";

import useInputState from "../hooks/useInputState";

import InputWrapper from "./InputWrapper";
import { StyledInput } from "./StyledComponents";

const TextInput = ({ name, inputRef, placeholder, onChange }) => {
  console.log('TextInput rendered!');
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
        ref={inputRef}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </InputWrapper>
  );
};

export default TextInput;