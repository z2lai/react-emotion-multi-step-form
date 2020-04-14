import React from "react";
import styled from "@emotion/styled";

import { StyledInputWrapper } from './Input';

const StyledLabel = styled.label`
  padding: 0 20px;
  border-radius: 25px;
  line-height: 2rem;
  font-size: 1.125rem;
  text-align: center;
  text-transform: capitalize;
  cursor: pointer;
  transition: background 0.3s ease-out;
  ${props => `
    border: 1px solid ${props.theme.colors.extraLight[props.type]};
    color: ${props.theme.colors.base[props.type]};
    ${props.checked ? `
      color: ${props.theme.colors.white};
      background: ${props.theme.colors.base[props.type]};
      &:hover {
        border: 1px solid ${props.theme.colors.extraLight[props.type]};
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
  <StyledInputWrapper active={props.active}>
    {props.types.map(type => (
      <RadioButton
        key={type}
        name={props.name}
        value={type}
        checked={props.selected === type}
        onChange={props.handleRadioSelection}
      />
    ))}
  </StyledInputWrapper>
);

export default RadioControl;
