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
    color: ${props.theme.colors.dark[props.type]};
    ${props.checked ? `
      color: ${props.theme.colors.white};
      background: ${props.theme.colors.dark[props.type]};
      &:hover {
        border: 1px solid ${props.theme.colors.light[props.type]};
      }
    ` : `
      background: ${props.theme.colors.white};
      &:hover {
        border: 1px solid ${props.theme.colors.base[props.type]};
      }
    `}
  `}
`;

const HiddenRadio = styled.input`
  position: absolute;
  opacity: 0;
`;

const RadioButton = props => (
  <StyledLabel type={props.value} checked={props.checked}>
    <HiddenRadio type="radio" {...props} />
    {props.value}
  </StyledLabel>
);

const RadioControl = props => {
  const options = ["guide", "tutorial", "reference"]; // should be queried from database in a useEffect hook
  return (
    <InputWrapper active={props.active}>
      {options.map(option => (
        <RadioButton
          name={props.name}
          key={option}
          value={option}
          checked={option === props.selection}
          onChange={event => props.handleChange(event.target.value)}
        />
      ))}
    </InputWrapper>
  )
};

export default log(RadioControl);
