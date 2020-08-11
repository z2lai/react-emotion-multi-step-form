/** @jsx jsx */
import { useState, useEffect } from "react";
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";

const TabsContainer = styled.div`
  display: flex;
  max-width: 500px;
  margin: 0 auto -1px auto;
  line-height: 30px;
  overflow: hidden;
`

const TabsWrapper = styled.ul`
  flex: 1 1 auto;
  display: inline-flex;
  margin: 0 10px;
  padding: 0;
`

const StyledTab = styled.li`
  position: relative;
  flex: 1 1 auto;
  border-top-right-radius: 17px 25px;
  border-top-left-radius: 17px 25px;
  z-index: ${props => props.zIndex};
  box-shadow: 0 10px 10px rgba(0, 0, 0, .5);
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

const StyledIconTab = styled.button`
  flex: none;
  width: 52px;
  border: 0;
  margin: 0;
  padding: 0;
  border-top-left-radius: 20px 30px;
  border-top-right-radius: 20px 30px;
  background: hsl(0, 0%, 100%);
  cursor: pointer;
`

const LabelTab = ({ htmlFor, label, zIndex, active, changeActiveIndex }) => {
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

const BackTab = ({ zIndex, active, changeActiveIndex }) => {
  const handleClick = event => {
    if (active) {
      console.log('click!');
      changeActiveIndex();
    }
  }

  return (
    <StyledIconTab
      zIndex={zIndex}
      active={active}
      onClick={handleClick}
    >
      {"<-"}
    </StyledIconTab>
  )
}

const Tabs = ({ inputs, activeIndex, changeActiveIndex }) => (
  <TabsContainer>
    <TabsWrapper>
      {(inputs.length > 0) ?
        inputs.map((input, index) => (
          <LabelTab
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
    </TabsWrapper>
    <BackTab
      key="back-button"
      label="X"
      zIndex={10}
      active={activeIndex > 0}
      changeActiveIndex={() => changeActiveIndex(activeIndex - 1)}
    />
  </TabsContainer>
)

export default Tabs;