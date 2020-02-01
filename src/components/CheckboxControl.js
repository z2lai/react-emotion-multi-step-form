import React from "react";
import { jsx, css } from "@emotion/core";
/** @jsx jsx */

const style = css`
  color: hotpink;
`;

const Checkbox = props => (
  <label>
    <input type="checkbox" {...props} />
    {props.value};
  </label>
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
