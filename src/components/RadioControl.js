import React from "react";
import styled from "@emotion/styled";

import useInputState from "../hooks/useInputState";

import InputWrapper from "./InputWrapper";
import withLog from "./withLog";

const StyledLabel = styled.label`
  margin: 0;
  padding: 2px 20px 0 20px;
  border-radius: 25px;
  line-height: 2rem;
  font-size: inherit;
  font-weight: inherit;
  text-align: center;
  text-transform: capitalize;
  cursor: pointer;
  transition: border 0.1s;
  ${props => `
    border: 1px solid white;
    color: ${props.theme.colors.dark[props.color]};
    ${props.isChecked ? `
      color: ${props.theme.colors.white};
      background: ${props.theme.colors.dark[props.color]};
      border: 1px solid ${props.theme.colors.light[props.color]};
    ` : `
      background: ${props.theme.colors.white};
      &:hover {
        border: 1px solid ${props.theme.colors.base[props.color]};
      }
    `}
  `}
`;

const HiddenRadio = styled.input`
  position: absolute;
  margin: -1px;
  border: 0;
  padding: 0;
  overflow: hidden;
  white-space: nowrap;
  clip-path: inset(50%);
`;

const RadioWrapper = styled.div`
  input:focus + label {
    box-shadow: ${props => `0 0 0 2px ${props.theme.colors.light[props.color]}`};
  }
`

export const RadioOption = props => ( // additional props are added through compound component pattern, so cannot destructure
  <RadioWrapper color={props.value}>
    <HiddenRadio
      type="radio"
      name={props.name}
      id={props.value}
      value={props.value}
      onChange={props.handleChange}
    />
    <StyledLabel
      htmlFor={props.value}
      isChecked={props.isChecked}
      color={props.value}
    >
      {props.value}
    </StyledLabel>
  </RadioWrapper>
);

export const RadioControl = ({ name, inputRef, onChange, children }) => {
  const { value, setValue } = useInputState(name, '', onChange);
  const handleChange = event => {
    setValue(event.target.value);
  }

  return (
    <InputWrapper name={name} inputRef={inputRef}>
      {React.Children.map(children, child => {
        if (child.type === RadioOption) {
          return React.cloneElement(child, {
            name: name,
            isChecked: child.props.value === value,
            handleChange: handleChange,
          });
        }
        return child;
      })}
    </InputWrapper>
  )
}

// const RadioControl = ({ active, name, handleChange, children }) => {
//   const options = ["guide", "tutorial", "reference"]; // should be queried from database in a useEffect hook
//   return (
//     <InputWrapper name={name} ref={inputRef}>
//       {options.map(option => (
//         <RadioOption
//           key={option}
//           name={name}
//           value={option}
//           onKeyup={event => handleChange(event.target.value)}
//           onChange={event => handleChange(event.target.value)}
//         />
//       ))}
//     </InputWrapper>
//   )
// };

// export default log(RadioControl);
