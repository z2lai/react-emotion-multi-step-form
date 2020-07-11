import React, { useState, useEffect, useContext } from "react";
import styled from "@emotion/styled";

import { InputsContext } from "../context/InputsContext";
import log from "../tests/log";

const StyledInputWrapper = styled.div`
  max-width: 500px;
  min-height: 40px;
  max-height: 220px;
  display: flex;
  flex-flow: ${props => props.column ? 'column nowrap' : 'row nowrap'};
  justify-content: space-evenly;
  align-items: center;
  font-size: 1.125rem;
  ${props => props.isActive ? `
    visibility: visible;
    opacity: 1;
    transition: opacity 600ms ease-out;
  ` : ` 
    position: absolute;
    visibility: hidden;
    opacity: 0;
  `}
`;

const InputWrapper = ({ name, column, children }) => {
  console.log('InputWrapper Rendered!');
  const { inputs, activeIndex } = useContext(InputsContext);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    console.log('InputWrapper Effect Ran!');
    if (inputs.length > 0) {
      console.log(inputs);
      const isActive = name === inputs[activeIndex].node.name;  // should I create new global state to store activeInputName instead?
      setIsActive(isActive);
    }
  }, [inputs, activeIndex, name]);

  return (
    <StyledInputWrapper isActive={isActive} column={column}>
      {children}
    </StyledInputWrapper >
  )
}

export default InputWrapper;