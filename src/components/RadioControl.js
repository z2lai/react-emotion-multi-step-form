import React from "react";
import styled from "@emotion/styled";

import StyledControlWrapper from './StyledControlWrapper';

const StyledLabel = styled.label`
  color: pink;
`;

const Option = props => (
  <StyledLabel>
    <input type="radio" {...props} />
    {props.value}
  </StyledLabel>
);

const RadioControl = props => (
  <StyledControlWrapper as="fieldset">
    <legend>Please select the type of article you are submitting:</legend>
    {props.types.map(type => (
      <Option
        key={type}
        name={props.name}
        value={type}
        checked={props.selected === type}
        onChange={props.handleRadioSelection}
      />
    ))}
  </StyledControlWrapper>
);

export default RadioControl;
