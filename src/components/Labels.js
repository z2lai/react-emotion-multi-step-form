/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";

import useInputs from "../core/useInputs";

//? Change this to a link element for accessibility?
const StyledLabel = styled.label`
  margin: 5px 0;
  text-transform: capitalize;
  transition: all 600ms;
  ${props => props.active ? `
    color: hsl(279, 75%, 35%);
  ` : props.activated ? `
    color: hsl(279, 9%, 25%);
    cursor: pointer;
  ` : `
    color: hsl(0, 100%, 99%);  
    opacity: 0.5;
  `}
`;

export const LabelsContainer = styled.div`
  margin-bottom: 10px;
  font-size: 1.5rem;
  line-height: 1;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`

const Label = ({
  label,
  inputValue,
  active,
  changeActiveIndex,
  activated
}) => {
  const handleClick = event => {
    if (!activated) return;
    changeActiveIndex();
  }

  return (
    <StyledLabel
      active={active}
      activated={activated}
      onClick={handleClick}
    >
      {inputValue || label}
    </StyledLabel>
  )
}

const Labels = () => {
  const { 
    inputs, 
    activeIndex, 
    changeActiveIndex, 
    inputValues 
  } = useInputs();

  return (
    <LabelsContainer>
      {(inputs.length > 0) 
        ? inputs.map((input, index) => (
          <Label
            key={`${index}${input.name}`}
            label={input.label}
            inputValue={inputValues[input.name]}
            active={index === activeIndex}
            changeActiveIndex={() => changeActiveIndex(index)}
            activated={index < activeIndex}
          />
        ))
        : null
      }
    </LabelsContainer>
  )
}

export default Labels;