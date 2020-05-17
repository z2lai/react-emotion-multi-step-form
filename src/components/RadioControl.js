import React from "react";
import styled from "@emotion/styled";

import { InputWrapper } from './StyledComponents';

const StyledLabel = styled.label`
  padding: 0 20px;
  border-radius: 25px;
  line-height: 2rem;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  text-transform: capitalize;
  cursor: pointer;
  transition: border 0.1s;
  ${props => `
    border: 1px solid ${props.theme.colors.light[props.type]};
    color: ${props.theme.colors.base[props.type]};
    ${props.checked ? `
      color: ${props.theme.colors.white};
      background: ${props.theme.colors.base[props.type]};
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

const RadioControl = props => (
  <InputWrapper active={props.active}>
    {props.options.map(option => (
      <RadioButton
        name={props.name}
        key={option}
        value={option}
        checked={option === props.selection}
        onChange={event => props.handleSelection(event.target.value)}
      />
    ))}
  </InputWrapper>
);

export default RadioControl;
