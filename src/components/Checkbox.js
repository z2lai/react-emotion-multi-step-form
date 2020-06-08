/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { Fragment } from 'react' 

/* Note: From Emotion documentation: https://emotion.sh/docs/styled#composing-dynamic-styles
// const dynamicStyles = props =>
//   css`
//     color: ${props.checked ? 'black' : 'grey'};
//     background: ${props.checked ? 'linear-gradient(45deg, #FFC107 0%, #fff200 100%)' : '#f5f5f5'};
//   `
*/

const StyledLabel = styled.label`
  position: relative;
  margin: 0;
  display: inline-flex;
  font-size: 1.125rem;
  text-transform: lowercase;
  cursor: pointer;
  span {
    white-space: pre;
  }
  ${props => `
    font-weight: ${props.focused ? '700' : '400'};
    color: ${props.checked ? props.theme.colors.dark.indigo : props.theme.colors.black};
    :hover {
      color: ${props.theme.colors.dark.indigo};
    }
    input:focus + div {
      box-shadow: 0 0 0 1px ${props.theme.colors.base.indigo};
    }
    mark {
      padding: 0;
      font-weight: bold;
      background-color: inherit;
      color: ${props.theme.colors.dark.indigo};
    }
  `}
`

// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input`
  position: absolute;
  margin: -1px;
  border: 0;
  padding: 0;
  overflow: hidden;
  white-space: nowrap;
  clip-path: inset(50%);
`

const StyledCheckbox = styled.div`
flex: none;
width: 16px;
height: 16px;
margin-top: 3px;
margin-right: 10px;
border-radius: 3px;
${props => `
  border: ${props.checked ? 'none' : '2px solid grey'};
  background: ${props.checked ? props.theme.colors.dark.indigo : 'none'};
  svg {
    visibility: ${props.checked ? 'visible' : 'hidden'};
  }
`}
transition: all 150ms;
`

const Icon = styled.svg`
  display: block;
  margin-top: -1;
  fill: none;
  stroke: white;
  stroke-width: 2px;
`

const TextWithHighlight = ({ text = '', highlight = '' }) => {
  if (!highlight.trim()) {
    return <span>{text}</span>
  }
  // Split on highlight text and include text, ignore case
  const regex = new RegExp(`(${highlight})`, 'gi')
  const parts = text.split(regex);
  const textWithHighlight = parts.map((part, i) => (
    regex.test(part) ?
      <mark key={i}>{part}</mark> :
      (part.length > 0 || (i > 0 && i < parts.length - 1)) && <span key={i}>{part}</span>
  ));
  return <Fragment>{textWithHighlight}</Fragment>
}

const CustomCheckbox = ({ name, value, highlight, focused, checked, onChange }) => (
  <StyledLabel checked={checked} focused={focused}>
    <HiddenCheckbox
      type="checkbox"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
    />
    <StyledCheckbox checked={checked}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
    <TextWithHighlight text={value} highlight={highlight} />
    {focused}
  </StyledLabel>
);

export default CustomCheckbox;