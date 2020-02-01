import React from "react";
import { jsx, css } from "@emotion/core";
/** @jsx jsx */

const style = css`
  color: hotpink;
`;

class RadioControl extends React.Component {
  render() {
    let Option = props => (
      <label css={style}>
        <input
          type="radio"
          {...props}
        />
        {props.value}
      </label>
    );
    
    return this.props.types.map(type => (
      <Option
        key={type}
        name={this.props.name}
        value={type}
        checked={this.props.selected === type}
        onChange={this.props.handleRadioSelection}
      />
    ));
  }
}

export default RadioControl;
