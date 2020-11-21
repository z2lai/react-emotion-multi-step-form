import React from "react";
import PropTypes from 'prop-types';
import inputPropTypes from '../propTypes'

import useAddInput from "../core/useAddInput";
import useInputState from "../core/useInputState";

import InputWrapper from "./InputWrapper";
import { StyledInput } from "./StyledComponents";

import getValidationAttributes from "../logic/getValidationAttributes";

const TextInput = ({
  name,
  type,
  placeholder,
  onChange,
  label,
  caption,
  icon,
  height,
  validationRules,
}) => {
  const validationAttributes = getValidationAttributes(validationRules);
  const { refCallback } = useAddInput({ label, caption, icon, height, validationRules, html5Validation: true });
  const { value, setValue } = useInputState(name, '');


  const handleChange = event => {
    const value = event.target.value;
    if (onChange) onChange(value);
    setValue(value);
  }

  return (
    <InputWrapper name={name}>
      <StyledInput
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        autocomplete="new-password"
        value={value}
        onChange={handleChange}
        ref={refCallback}
        {...validationAttributes}
      />
    </InputWrapper>
  );
};

TextInput.propTypes = { 
  ...inputPropTypes, 
  placeholder: PropTypes.string,
}

export default TextInput;