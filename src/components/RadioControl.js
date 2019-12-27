import React from "react";

const RadioControl = props => {
  return props.options.map(option => (
    <label key={option}>
      <input
        key={option}
        type="radio"
        name={props.name}
        value={option}
        checked={props.selected === option}
        onChange={props.onChange}
      />
      {option}
    </label>
  ));
};

export default RadioControl;
