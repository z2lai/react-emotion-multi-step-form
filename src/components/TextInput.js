import React from "react";
import PropTypes from 'prop-types';

import useAddInput from "../core/useAddInput";
import useInputState from "../core/useInputState";

import InputWrapper from "./InputWrapper";
import { StyledInput } from "./StyledComponents";

const propTypes ={
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  caption: PropTypes.string,
  icon: PropTypes.elementType,
  height: PropTypes.number,
  validationRules: PropTypes.object,
}

const TextInput = ({
  name,
  placeholder,
  onChange,
  label,
  caption,
  icon,
  height,
  validationRules,
}) => {
  const { refCallback } = useAddInput({ label, caption, icon, height, validationRules });
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
        id={name}
        name={name}
        ref={refCallback}
        placeholder={placeholder}
        autocomplete="new-password"
        value={value}
        onChange={handleChange}
      />
    </InputWrapper>
  );
};

export default TextInput;