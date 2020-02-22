import { jsx } from "@emotion/core";
import styled from '@emotion/styled';
/** @jsx jsx */

/* Note: From Emotion documentation: https://emotion.sh/docs/styled#composing-dynamic-styles
// const dynamicStyles = props =>
//   css`
//     color: ${props.checked ? 'black' : 'grey'};
//     background: ${props.checked ? 'linear-gradient(45deg, #FFC107 0%, #fff200 100%)' : '#f5f5f5'};
//   `
*/

const StyledCheckbox = styled.label`
  display: inline-block;
  border: 1px solid black;
  padding: 0 20px;
  line-height: 2rem;
  border-radius: 25px;
  vertical-align: middle;
  transition: all 0.3s;
  ${props => ( // Note: This uses regular JS template literal, not emotion
    `color: ${props.checked ? 'black' : 'grey'};
    background: ${props.checked ? 'linear-gradient(45deg, #FFC107 0%, #fff200 100%)' : '#f5f5f5'};`
  )}
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
`

const Checkbox = props => (
  <StyledCheckbox checked={props.checked}>
    <HiddenCheckbox type="checkbox" {...props} />
    {props.value}
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
