import React from "react";
import styled from "@emotion/styled";

import { StyledInputWrapper } from './Input';

const StyledLabel = styled.label`
  padding: 0 20px;
  border-radius: 25px;
  line-height: 2rem;
  font-size: 1rem;
  text-align: center;
  text-transform: capitalize;
  cursor: pointer;
  ${props => `
    border: 1px solid ${props.theme.colors.light[props.type]};
    color: ${props.theme.colors.base[props.type]};
    &:hover {
      border: 1px solid ${props.theme.colors.base[props.type]};
    }
    ${props.checked ? `
      color: white;
      background: ${props.theme.colors.base[props.type]};
    ` : `
      background: ${props.theme.colors.white};
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
