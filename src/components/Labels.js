/** @jsx jsx */
import { useState, useEffect } from "react";
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";

import useActiveIndex from "../core/useActiveIndex";
import useInputs from "../core/useInputs";

export const LabelsContainer = styled.div`
  margin-bottom: 10px;
  font-size: 1.5rem;
  line-height: 1;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`

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

const Label = ({ htmlFor, label, inputValue, active, changeActiveIndex, activated }) => {
  // const [activated, setActivated] = useState(false);
  const handleClick = event => {
    if (activated) {
      changeActiveIndex();
    }
  }

  // useEffect(() => {
  //   if (active && !activated) {
  //     setActivated(true);
  //   }
  // }, [active, activated])

  return (
    <StyledLabel
      htmlFor={htmlFor}
      active={active}
      activated={activated}
      onClick={handleClick}
    >
      {inputValue || label}
    </StyledLabel>
  )
}

const Labels = () => {
  const { activeIndex, changeActiveIndex } = useActiveIndex();
  const { inputs, inputValues } = useInputs();

  return (
    <LabelsContainer>
      {(inputs.length > 0) ?
        inputs.map((input, index) => (
          <Label
            key={`${index}${input.name}`}
            htmlFor={input.name}
            label={input.label}
            inputValue={inputValues[input.name] && inputValues[input.name].length ? inputValues[input.name] : null}
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