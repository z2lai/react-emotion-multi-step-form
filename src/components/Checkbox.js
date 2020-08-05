/** @jsx jsx */
import { Fragment } from 'react' 
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";

const StyledLabel = styled.label`
  position: relative;
  margin: 0;
  display: inline-flex;
  align-items: center;
  line-height: 1.25rem;
  font-size: 1.125rem;
  text-transform: lowercase;
  cursor: pointer;
  ${props => `
    font-weight: ${props.focusState ? '600' : '400'};
    color: ${props.checked ? props.theme.colors.dark.indigo : 'inherit'};
    :hover {
      color: ${props.theme.colors.dark.indigo};
    }
    input + div {
      box-shadow: ${props.focusState ? `0 0 0 2px ${props.theme.colors.base.indigo}` : `none`};
    }
    input:focus + div {
      box-shadow: 0 0 0 2px ${props.theme.colors.base.indigo};
    }
    mark {
      display: inline;
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
margin-top: 2px;
margin-right: 10px;
border-radius: 3px;
${props => `
  border: ${props.checked ? 'none' : `2px solid ${props.theme.colors.extraDark.indigo}`};
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
  const parts = text.split(regex); // if match is found at start/end, an empty element is inserted at start/end
  const textWithHighlight = parts.map((part, i) => (
    regex.test(part) ?
      <mark key={i}>{part}</mark> :
      (part.length > 0 || (i > 0 && i < parts.length - 1)) && <Fragment key={i}>{part}</Fragment> // exclude leading/trailing empty element
  ));
  return <span>{textWithHighlight}</span>
}

const CustomCheckbox = ({ name, value, checked, onKeyDown, onChange, highlightedText, focusState }) => (
  <StyledLabel checked={checked} focusState={focusState}>
    <HiddenCheckbox
      type="checkbox"
      name={name}
      value={value}
      checked={checked}
      onKeyDown={onKeyDown}
      onChange={onChange}
    />
    <StyledCheckbox checked={checked}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
    <TextWithHighlight text={value} highlight={highlightedText} />
  </StyledLabel>
);

export default CustomCheckbox;