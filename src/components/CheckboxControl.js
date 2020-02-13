import React from "react";
import { jsx, css } from "@emotion/core";
import styled from '@emotion/styled';
/** @jsx jsx */

const StyledCheckbox = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid black;
  border-radius: 25%;
  padding: 10px 5px;
  background: ${props => props.checked ? '#fff200' : '#4b4b4b'};
`;

const Checkbox = props => (
  <StyledCheckbox checked={props.checked}>
    <input type="checkbox" {...props} />
    {props.value};
  </StyledCheckbox>
);

const CheckboxControl = props => {
  return Object.keys(props.topics).map(topic => (
    <Checkbox
      key={topic}
      value={topic}
      name={props.name}
      checked={props.topics[topic]}
      onChange={props.handleCheckboxChange}
    />
  ));
};

export default CheckboxControl;
