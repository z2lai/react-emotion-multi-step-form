import React from "react";
import { jsx, css } from "@emotion/core";
/** @jsx jsx */

const style = css`
  color: hotpink;
`;

const Option = props => (
  <label css={style}>
    <input
      type="radio"
      name={props.name}
      value={props.value}
      checked={props.selected}
      onChange={props.onChange}
    />
    {props.value}
  </label>
);

class RadioControl extends React.Component {
  render() {
    return this.props.options.map(option => (
      <Option
        key={option}
        value={option}
        name={this.props.controlName}
        selected={this.props.selected === option}
        onChange={this.props.onChange}
      />
    ));
  }
}

export default RadioControl;
