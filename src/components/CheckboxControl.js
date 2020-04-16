import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
/** @jsx jsx */

import { StyledInput, StyledInputWrapper } from './StyledInput';

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
  padding: 0 20px;
  line-height: 1.875;
  border-radius: 3px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: border 0.1s;
  ${props => `
    border: 1px solid ${props.theme.colors.extraLight.indigo};
    background: ${props.checked ? props.theme.colors.dark.indigo : props.theme.colors.white};
    color: ${props.checked ? props.theme.colors.white : props.theme.colors.black};
    &:hover {
      border: 1px solid ${props.theme.colors.base.indigo};
    }
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
  max-height: 126px;
  overflow: hidden;
`

const Divider = styled.div`
  width: 100%;
  max-width: 584px;
  &:before {
    content: '';
    display: block;
    transform: scaleX(0);
    transition: transform 400ms ease-in-out;
    ${props => `
      border-bottom: solid 1px ${props.theme.colors.black};
      ${props.active ? "transform: scaleX(1);" : ""}
    `}
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
