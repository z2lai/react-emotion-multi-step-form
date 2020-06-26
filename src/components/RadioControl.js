import React from "react";
import styled from "@emotion/styled";

import { InputWrapper } from './StyledComponents';

import log from "../tests/log";

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
    ${props.checked ? `
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

const RadioButton = ({ name, value, checked, onKeyPress, onChange }) => (
  <RadioWrapper color={value}>
    <HiddenRadio
      type="radio"
      name={name}
      id={value}
      value={value}
      checked={checked}
      onKeyPress={onKeyPress}
      onChange={onChange}
    />
    <StyledLabel htmlFor={value} checked={checked} color={value}>
      {value}
    </StyledLabel>
  </RadioWrapper>
);

const RadioControl = ({ active, name, selection, handleChange }) => {
  const options = ["guide", "tutorial", "reference"]; // should be queried from database in a useEffect hook
  return (
    <InputWrapper active={active}>
      {options.map(option => (
        <RadioButton
          key={option}
          name={name}
          value={option}
          checked={option === selection}
          onKeyPress={event => handleChange(event.target.value)}
          onChange={event => handleChange(event.target.value)}
        />
      ))}
    </InputWrapper>
  )
};

export default log(RadioControl);
