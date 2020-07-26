import React, { useRef } from "react";
import styled from "@emotion/styled";

import useActiveIndex from "../hooks/useActiveIndex";

import withLog from "./withLog";

const StyledInputWrapper = styled.div`
  max-width: 500px;
  height: 100%;
  display: flex;
  ${props => props.column ? `
    flex-flow: column nowrap;
    justify-content: flex-start;
  ` : `
    flex-flow: row nowrap;
    justify-content: space-evenly;
  `}
  align-items: center;
  font-size: 1.125rem;
  outline: none;
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

const InputWrapper = ({ name, inputRef, column, children }) => {
  console.log(`InputWrapper Rendered! for ${name}`);
  const { activeInput } = useActiveIndex();
  // const isActiveRef = useRef(false);
  // const [isActive, setIsActive] = useState(false);

  // useEffect(() => {
  //   console.log(`InputWrapper Effect Ran for ${name}!`);
  //   console.log(activeInput);
  //   if (activeInput) {
  //     const activeInputNode = activeInput.node;
  //     const activeInputName = activeInputNode.name || activeInputNode.dataset.name;
  //     const isActive = name === activeInputName;
  //     setIsActive(isActive);
  //   } else {
  //     setIsActive(false);
  //   }
  // }, [activeInput]);

  console.log(activeInput);
  let isActive = false;
  if (activeInput) {
    const activeInputNode = activeInput.node;
    const activeInputName = activeInputNode.name || activeInputNode.dataset.name;
    isActive = name === activeInputName;
    console.log(`${name} active: ${isActive}`);
  } else {
    isActive = false;
  };

  return (
    <StyledInputWrapper
      data-name={name}
      ref={inputRef}
      tabIndex={-1}
      column={column}
      isActive={isActive}
    >
      {children}
    </StyledInputWrapper>
  )
}

export default InputWrapper;