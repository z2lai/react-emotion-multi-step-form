import React from "react";
import styled from "@emotion/styled";

const StyledLabel = styled.label`
  color: pink;
`

const Option = props => (
  <StyledLabel>
    <input type="radio" {...props} />
    {props.value}
  </StyledLabel>
)

const RadioControl = props => (
  props.types.map(type => (
    <Option
      key={type}
      name={props.name}
      value={type}
      checked={props.selected === type}
      onChange={props.handleRadioSelection}
    />
  ))
);

export default RadioControl;
