import { useState } from "react";
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
/** @jsx jsx */
import ChipInput from 'material-ui-chip-input';


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
  margin: 3px 0;
  padding: 0 2px;
`
    
const StyledLabel = styled.label`
  position: relative;
  display: inline-flex;
  font-size: 1.125rem;
  text-transform: lowercase;
  cursor: pointer;
  ${props => `
    font-weight: ${props.checked ? '500' : '500'};
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

const CheckboxControl = ({ active, name, options, setOptionGroups, OptionsArray, tags, setTags }) => {
  const [tagFilter, setTagFilter] = useState(''); // create custom hook to debounce

  const onBeforeAdd = tagName => {
    // Check that there's at least one topic left after the filter
    // Check that the
    return true;
  }

  const updateTagOptions = tagName => {
    const groups = options.groups;
    groups.forEach(group => {
      if (group.hasOwnProperty(tagName)) {
        group[tagName] = !group[tagName]
      }
    })
    setOptionGroups(groups);
  };

  const addTag = tagName => {
    if (tags.includes(tagName)) {
      alert("Duplicate Tag!");
    } else {
      setTags([...tags, tagName])
      setTagFilter('');
      updateTagOptions(tagName);
    }
  };

  const deleteTag = tagName => {
    const index = tags.indexOf(tagName);
    if (index === -1) {
      alert("Tag cannot be deleted as it doesn't exist!")
    } else {
      const newArr = tags;
      newArr.splice(index,1);
      setTags(newArr);
    }
    updateTagOptions(tagName);
  };

  const handleCheckboxChange = event => {
    const checkbox = event.target
    if (checkbox.checked) {
      addTag(checkbox.value);
    } else {
      deleteTag(checkbox.value);
    }
  }

  return (
    <InputWrapper active={active}>
      {/* <StyledInput
        type="text"
        placeholder="Tags"
        value={tagFilter}
        onChange={event => setTagFilter(event.target.value.toLowerCase())}
      /> */}
      <ChipInput
        placeholder="Tags"
        helperText=""
        fullWidth
        inputValue={tagFilter}
        onUpdateInput={(event) => setTagFilter(event.target.value.toLowerCase())}
        onAdd={chip => addTag(chip)}
        onDelete={(chip, index) => deleteTag(chip)}
        value={tags}
        />
      {/* <Divider active={active} /> */}
      <CheckBoxSection>
        {options.groupHeadings.map((groupHeading, groupIndex) => {
          const topicGroup = options.groups[groupIndex]
          const filteredTopicGroup = Object.keys(topicGroup).filter(topic => topic.toLowerCase().includes(tagFilter))
          if (filteredTopicGroup.length > 0) {
            return (
              <div key={groupHeading}>
                <GroupHeading>
                  {groupHeading}
                </GroupHeading>
                <GroupContainer>
                  {filteredTopicGroup.map(topic => (
                    <CustomCheckBoxWrapper key={topic}>
                      <CustomCheckbox
                        name={name}
                        key={topic}
                        value={topic}
                        checked={topicGroup[topic]}
                        onChange={event => handleCheckboxChange(event)}
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