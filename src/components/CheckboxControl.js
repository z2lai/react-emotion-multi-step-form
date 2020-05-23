import { useState } from "react";

import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
/** @jsx jsx */

import { StyledInput, InputWrapper } from './StyledComponents';

/* Note: From Emotion documentation: https://emotion.sh/docs/styled#composing-dynamic-styles
// const dynamicStyles = props =>
//   css`
//     color: ${props.checked ? 'black' : 'grey'};
//     background: ${props.checked ? 'linear-gradient(45deg, #FFC107 0%, #fff200 100%)' : '#f5f5f5'};
//   `
*/

const Divider = styled.div`
  width: 100%;
  margin-top: -5px;
  &:before {
    content: '';
    display: block;
    transform: scaleX(0);
    transition: transform 400ms ease-in-out;
    ${props => `
      border-bottom: solid 1px ${props.theme.colors.black};
      ${props.active ? "transform: scaleX(1)" : ""};
    `}
  }
`

const CheckBoxSection = styled.div`
  height: 180px;
  width: 100%;
  overflow: auto
`

const GroupContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding: 0 10px;
`

const GroupHeading = styled.div`
  margin: 10px 0 5px 0;
  font-size: 1.25rem;
  font-weight: bold;
  text-transform: capitalize;
`

// Button style multi-select
// const StyledLabel = styled.label`
//   display: inline-block;
//   margin: 5px;
//   padding: 0 20px;
//   line-height: 1.875;
//   border-radius: 3px;
//   font-size: 1rem;
//   font-weight: 500;
//   cursor: pointer;
//   transition: border 0.1s;
//   ${props => `
//     border: 1px solid ${props.theme.colors.extraLight.indigo};
//     background: ${props.checked ? props.theme.colors.dark.indigo : props.theme.colors.white};
//     color: ${props.checked ? props.theme.colors.white : props.theme.colors.black};
//     &:hover {
//       border: 1px solid ${props.theme.colors.base.indigo};
//     }
//   `}
// `;

const CustomCheckBoxWrapper = styled.div`
  flex: 1 1 50%;
  margin: 5px 0;
`
    
const StyledLabel = styled.label`
  position: relative;
  display: inline-flex;
  font-size: 1.125rem;
  text-transform: lowercase;
  cursor: pointer;
  ${props => `
    font-weight: ${props.checked ? '600' : '500'};
    color: ${props.checked ? props.theme.colors.dark.indigo : props.theme.colors.black};
    :hover {
      color: ${props.theme.colors.dark.indigo};
    }
    input:focus + div {
      box-shadow: 0 0 0 1px ${props.theme.colors.base.indigo};
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
margin-right: 5px;
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

const CustomCheckbox = props => (
  <StyledLabel checked={props.checked}>
    <HiddenCheckbox type="checkbox" {...props} />
    <StyledCheckbox checked={props.checked}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
    <span>{props.value}</span>
  </StyledLabel>
);

const CheckboxControl = ({ active, name, tagOptions, handleSelection }) => {
  const [tagFilter, setTagFilter] = useState(''); // create custom hook to debounce

  return (
    <InputWrapper active={active}>
      <StyledInput
        type="text"
        placeholder="Tags"
        value={tagFilter}
        onChange={event => setTagFilter(event.target.value.toLowerCase())}
      />
      <Divider active={active} />
      <CheckBoxSection>
        {tagOptions.parentTopics.map(parentTopic => {
          const index = tagOptions.parentTopics.indexOf(parentTopic);
          const subTopicGroup = tagOptions.subTopicGroups[index]
          const subTopicsFiltered = Object.keys(subTopicGroup)
            .filter(subTopic => subTopic.toLowerCase().includes(tagFilter))
          if (subTopicsFiltered.length > 0) {
            return (
              <div key={parentTopic}>
                <GroupHeading>
                  {parentTopic}
                </GroupHeading>
                <GroupContainer>
                  {subTopicsFiltered.map(subTopic => (
                    <CustomCheckBoxWrapper key={subTopic}>
                      <CustomCheckbox
                        name={name}
                        key={subTopic}
                        value={subTopic}
                        checked={subTopicGroup[subTopic]}
                        onChange={handleSelection}
                      />
                    </CustomCheckBoxWrapper>
                    ))}
                </GroupContainer>
              </div>
            )
          }
        })}
      </CheckBoxSection>
    </InputWrapper>
  )
};

export default CheckboxControl;