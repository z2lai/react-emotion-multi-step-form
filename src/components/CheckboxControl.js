import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
/** @jsx jsx */

import StyledInputWrapper from './StyledInputWrapper';

/* Note: From Emotion documentation: https://emotion.sh/docs/styled#composing-dynamic-styles
// const dynamicStyles = props =>
//   css`
//     color: ${props.checked ? 'black' : 'grey'};
//     background: ${props.checked ? 'linear-gradient(45deg, #FFC107 0%, #fff200 100%)' : '#f5f5f5'};
//   `
*/

const StyledLabel = styled.label`
  display: inline-block;
  border: 1px solid black;
  padding: 0 20px;
  line-height: 2rem;
  border-radius: 25px;
  font-size: 1rem;
  transition: all 0.3s;
  ${props => `
    color: ${props.checked ? "black" : "grey"};
    background: ${props.checked ? "linear-gradient(45deg, #FFC107 0%, #fff200 100%)" : "#f5f5f5"};
  `}
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
`;

const Checkbox = props => (
  <StyledLabel checked={props.checked}>
    <HiddenCheckbox type="checkbox" {...props} />
    {props.value}
  </StyledLabel>
);

const CheckboxControl = props => (
  <StyledInputWrapper active={props.active}>
    {Object.keys(props.topics).map(topic => (
      <Checkbox
        key={topic}
        name={props.name}
        value={topic}
        checked={props.topics[topic]}
        onChange={props.handleCheckboxChange}
      />
    ))}
  </StyledInputWrapper>
);

export default CheckboxControl;
