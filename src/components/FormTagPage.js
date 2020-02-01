import React from "react";
import { jsx, css } from "@emotion/core";
/** @jsx jsx */

const style = css`
  color: hotpink;
`;

class FormTagPage extends React.Component {
  render() {
    let Option = props => (
      <label css={style}>
        <input type="radio" name={props.name} value={props.value} checked={props.selected} onChange={props.onChange} />
        {props.value}
      </label>
    );

    return this.props.topics.map(topic => (
      <Option
        key={topic}
        value={topic}
        name={this.props.name}
        selected={this.props.selected === topic}
        onChange={this.props.onChange}
      />
    ));
  }
}

export default FormTagPage;
