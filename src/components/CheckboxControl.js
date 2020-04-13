import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
/** @jsx jsx */

import { StyledInput, StyledInputWrapper } from './Input';

/* Note: From Emotion documentation: https://emotion.sh/docs/styled#composing-dynamic-styles
// const dynamicStyles = props =>
//   css`
//     color: ${props.checked ? 'black' : 'grey'};
//     background: ${props.checked ? 'linear-gradient(45deg, #FFC107 0%, #fff200 100%)' : '#f5f5f5'};
//   `
*/

const StyledLabel = styled.label`
  display: inline-block;
  margin: 5px;
  border: 1px solid rgba(183, 221, 195, 0.7);
  padding: 0 20px;
  line-height: 1.875;
  border-radius: 3px;
  font-size: 1rem;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    
  }
  ${props => `
    color: ${props.checked ? "hsl(0, 0%, 20%)" : "hsl(0, 0%, 20%)"};
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

const CheckBoxContainer = styled.div`
  margin-top: 10px;
`

const Divider = styled.div`
  width: 100%;
  max-width: 500px;
  &:before {
    content: '';
    display: block;
    border-bottom: solid 1px #222222;
    transform: scaleX(0);
    transition: transform 400ms ease-in-out;
    ${props => props.active ? "transform: scaleX(1);" : ""}
  }
`

const CheckboxControl = props => (
  <StyledInputWrapper active={props.active}>
    <StyledInput type="text" placeholder="Article Tags" />
    <Divider active={props.active} />
    <CheckBoxContainer>
      {Object.keys(props.topics).map(topic => (
        <Checkbox
          key={topic}
          name={props.name}
          value={topic}
          checked={props.topics[topic]}
          onChange={props.handleCheckboxChange}
        />
      ))}
    </CheckBoxContainer>
  </StyledInputWrapper >
);

export default CheckboxControl;
