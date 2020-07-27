import React from "react";
import styled from "@emotion/styled";

import useInputState from "../hooks/useInputState";

import InputWrapper from "./InputWrapper";

const StyledLabel = styled.label`
  margin: 0;
  padding: 2px 20px 0 20px;
  border-radius: 25px;
  line-height: 2rem;
  font-size: inherit;
  font-weight: inherit;
  text-align: center;
  text-transform: capitalize;
  cursor: pointer;
  transition: border 0.1s;
  ${props => `
    border: 1px solid white;
    color: ${props.theme.colors.dark[props.color]};
    ${props.isChecked ? `
      color: ${props.theme.colors.white};
      background: ${props.theme.colors.dark[props.color]};
      border: 1px solid ${props.theme.colors.light[props.color]};
    ` : `
      background: ${props.theme.colors.white};
      &:hover {
        border: 1px solid ${props.theme.colors.base[props.color]};
      }
    `}
  `}
`;

const HiddenRadio = styled.input`
  position: absolute;
  margin: -1px;
  border: 0;
  padding: 0;
  overflow: hidden;
  white-space: nowrap;
  clip-path: inset(50%);
`;

const RadioWrapper = styled.div`
  input:focus + label {
    box-shadow: ${props => `0 0 0 2px ${props.theme.colors.light[props.color]}`};
  }
`

export const RadioOption = ({ name, value, isChecked, handleChange }) => (
  <RadioWrapper color={value}>
    <HiddenRadio
      type="radio"
      name={name}
      id={value}
      value={value}
      onChange={handleChange}
    />
    <StyledLabel
      htmlFor={value}
      isChecked={isChecked}
      color={value}
    >
      {value}
    </StyledLabel>
  </RadioWrapper>
);

export const RadioControl = ({ name, inputRef, onChange, children }) => {
  const { value, setValue } = useInputState(name, '');
  const handleChange = event => {
    const value = event.target.value;
    if (onChange) onChange(value);
    setValue(value);
  }

  return (
    <InputWrapper name={name} inputRef={inputRef}>
      {React.Children.map(children, child => {
        if (child.type === RadioOption) {
          return React.cloneElement(child, {
            name: name,
            isChecked: child.props.value === value,
            handleChange: handleChange,
          });
        }
        return child;
      })}
    </InputWrapper>
  )
}