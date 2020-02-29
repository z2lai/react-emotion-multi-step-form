import React from "react";
import styled from "@emotion/styled";

import StyledControlWrapper from './StyledControlWrapper';

const StyledLabel = styled.label`
  flex: 1;
  border: 1px solid black;
  padding: 0 20px;
  line-height: 3rem;
  font-size: 1rem;
  text-align: center;
  transition: all 0.3s;
  ${props => (` // Note: This uses regular JS template literal, not emotion
    color: ${props.checked ? "#333" : "grey"};
    background: ${props.checked ? "linear-gradient(45deg, #FFC107 0%, #fff200 100%)" : "#f5f5f5"};
  `)}
`;

const HiddenRadio = styled.input`
  position: absolute;
  opacity: 0;
`;

const Radio = props => (
  <StyledLabel checked={props.checked}>
    <HiddenRadio type="radio" {...props} />
    {props.value}
  </StyledLabel>
);

const StyledRadioWrapper = styled.div`
  display: flex;
`

const RadioControl = props => (
  <StyledControlWrapper as="fieldset">
    <legend>Type of Article</legend>
    <StyledRadioWrapper>
      {props.types.map(type => (
        <Radio
          key={type}
          name={props.name}
          value={type}
          checked={props.selected === type}
          onChange={props.handleRadioSelection}
        />
      ))}
    </StyledRadioWrapper>
  </StyledControlWrapper>
);

export default RadioControl;
