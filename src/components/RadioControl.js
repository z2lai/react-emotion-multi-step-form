import React from "react";
import styled from "@emotion/styled";

import StyledInputWrapper from './StyledInputWrapper';

const StyledLabel = styled.label`
  border: 1px solid black;
  padding: 0 20px;
  line-height: 3rem;
  font-size: 1rem;
  text-align: center;
  transition: all 0.3s;
  ${props => (`
    color: ${props.checked ? "#333" : "grey"};
    background: ${props.checked ? "linear-gradient(45deg, #FFC107 0%, #fff200 100%)" : "#f5f5f5"};
  `)}
`;

const HiddenRadio = styled.input`
  position: absolute;
  opacity: 0;
`;

const RadioButton = props => (
  <StyledLabel checked={props.checked}>
    <HiddenRadio type="radio" {...props} />
    {props.value}
  </StyledLabel>
);

const RadioControl = props => (
  <StyledInputWrapper>
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
