/** @jsx jsx */
import { useState, useEffect } from "react";
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";

const StyledTab = styled.li`
  position: relative;
  flex: 1 1 0;
  border-top-right-radius: 17px 25px;
  border-top-left-radius: 17px 25px;
  z-index: ${props => props.zIndex};
  box-shadow: 0 10px 20px rgba(0, 0, 0, .3);
  background: hsl(0, 0%, 87%);
  list-style: none;
  font-weight: 500;
  label {
    pointer-events: none;
  }
  &::before, &::after {
    content: '';
    position: absolute;
    top: 0px;
    width: 20px;
    height: 20px;
    border: 10px solid hsl(0, 0%, 87%);
    border-radius: 100%;
    background: transparent;
  }
  &::before {
    left: -30px;
    clip-path: inset(50% 0 0 50%);
  }
  &::after {
    right: -30px;
    clip-path: inset(50% 50% 0 0);
  }  
  ${props => props.active ? `
    z-index: 10;
    background: hsl(0, 0%, 100%);
    &::before, &::after {
      border-color: hsl(0, 0%, 100%);
    }
  ` : props.activated ? `
    cursor: pointer;
    &:hover {
      z-index: 10;
      background: hsl(0, 0%, 100%);
    }
    &:hover::before, &:hover::after {
      border-color: hsl(0, 0%, 100%);
    }
  ` : `
  `}
`

const TabsContainer = styled.ul`
  display: flex;
  max-width: 500px;
  line-height: 30px;
  margin: 0 auto -1px auto;
  padding: 0 10px;
  overflow: hidden;
`

const Tab = ({ htmlFor, label, zIndex, active, changeActiveIndex }) => {
  const [activated, setActivated] = useState(false);

  const handleClick = event => {
    if (activated && !active) {
      console.log('click!');
      changeActiveIndex();
    }
  }

  useEffect(() => {
    if (active && !activated) {
      setActivated(true);
    }
  }, [active, activated])

  return (
    <StyledTab
      zIndex={zIndex}
      active={active} 
      activated={activated} 
      onClick={handleClick}
    >
      <label htmlFor={htmlFor}>{label}</label>
    </StyledTab>
  )
}

const Labels = ({ inputs, activeIndex, changeActiveIndex }) => (
  <TabsContainer>
    {(inputs.length > 0) ?
      inputs.map((input, index) => (
        <Tab
          key={`${index}${input.name}`}
          htmlFor={input.name}
          label={input.label}
          zIndex={inputs.length - index}
          active={index === activeIndex}
          changeActiveIndex={() => changeActiveIndex(index)}
        />
      ))
      : null
    }
  </TabsContainer>
)

export default Labels;