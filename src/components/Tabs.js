/** @jsx jsx */
import { useRef } from "react";
import { jsx, css, keyframes } from "@emotion/core";
import styled from "@emotion/styled";

import { BackButtonIcon } from "./StyledComponents";

import useScaleAnimation from "../core/useScaleAnimation";

const TabsContainer = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  max-width: ${props => props.basePageWidth}px;
  line-height: 30px;
  ${props => css`
    transform-origin: center top;
    animation-name: ${keyframes(props.scaleAnimation)};
    animation-duration: 400ms;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  `}
`

const LabelTabsWrapper = styled.div`
  margin-bottom: -1px;
  flex: 0 1 450px;
  display: inline-flex;
  padding: 0 10px;
  text-align: center;
  ${props => props.isSubmitPage ? `
    z-index: -1;
    opacity: 0;
    visibility: hidden;
    transition: opacity 200ms ease-in-out 100ms, visibility 0ms linear 400ms;
  ` : `
    opacity: 1;
    visibility: visible;
  `}
`

const StyledLabelTab = styled.li`
  position: relative;
  flex: 1 1 0;
  border-top-right-radius: 17px 25px;
  border-top-left-radius: 17px 25px;
  z-index: ${props => props.zIndex};
  box-shadow: 0 10px 10px rgba(0, 0, 0, .5);
  background: hsl(0, 0%, 87%);
  list-style: none;
  font-weight: 500;
  text-transform: capitalize;
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
    color: hsla(0, 0%, 25%, 0.5);
  `}
`

const IconTabWrapper = styled.div`
  flex: ${props => props.isSubmitPage ? 'none' : '1 1 auto'};
  min-width: ${props => props.isSubmitPage ? '50px' : '40px'};
  line-height: 0;
  ${props => css`
    transform-origin: right top;
    animation-name: ${keyframes(props.inverseScaleAnimation)};
    animation-duration: 400ms;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  `}
`

const StyledIconTab = styled.button`
  position: relative;
  height: 100%;
  width: 100%;
  margin: 0;
  border: 0;
  padding: 0;
  border-top-left-radius: 30px 30px;
  border-top-right-radius: 30px 30px;
  background: hsl(0, 0%, 100%);
  cursor: pointer;
  transition: transform 300ms;
  ${props => !props.active ? `
    transform: translateY(30px);
    visibility: hidden;
    transition: transform 300ms, visibility 0ms ease 300ms;
  ` : `
    visibility: visible;
  `}
  &:focus {
    outline: none;
    border: 2px solid ${props => props.theme.colors.light.indigo};
  }
  div {
    opacity: .5;
  }
  &:hover div, &:focus div {
    opacity: .75;
  }
`

const LabelTab = ({
  htmlFor,
  label,
  zIndex,
  active,
  changeActiveIndex,
  activated
}) => {

  const handleClick = event => {
    if (activated) {
      changeActiveIndex();
    }
  }

  return (
    <StyledLabelTab
      zIndex={zIndex}
      active={active}
      activated={activated}
      onClick={handleClick}
    >
      <label htmlFor={htmlFor}>{label}</label>
    </StyledLabelTab>
  )
}

const BackTab = ({ active, changeActiveIndex }) => {
  const handleClick = event => {
    if (active) {
      changeActiveIndex();
    }
  }

  return (
    <StyledIconTab
      active={active}
      onClick={handleClick}
    >
      <BackButtonIcon />
    </StyledIconTab>
  )
}

const Tabs = ({
  basePageWidth,
  inputs,
  activeIndex,
  changeActiveIndex,
  isSubmitPage
}) => {
  const tabContainerRef = useRef();

  const SUBMIT_TABS_WIDTH = 50;
  const pageRelativeWidth = isSubmitPage ? SUBMIT_TABS_WIDTH / basePageWidth : 1;
  const { scaleAnimation, inverseScaleAnimation } = useScaleAnimation(pageRelativeWidth, 1);

  return (
    <TabsContainer
      ref={tabContainerRef}
      basePageWidth={basePageWidth}
      isSubmitPage={isSubmitPage}
      scaleAnimation={scaleAnimation}
    >
      <LabelTabsWrapper isSubmitPage={isSubmitPage}>
        {(inputs.length > 0)
          ? inputs.map((input, index) => (
            <LabelTab
              key={`${index}${input.name}`}
              htmlFor={input.name}
              label={input.label || input.name}
              zIndex={inputs.length - index}
              active={index === activeIndex}
              changeActiveIndex={() => changeActiveIndex(index)}
              activated={index < activeIndex}
            />
          ))
          : null
        }
      </LabelTabsWrapper>
      <IconTabWrapper isSubmitPage={isSubmitPage} inverseScaleAnimation={inverseScaleAnimation}>
        <BackTab
          active={activeIndex > 0}
          changeActiveIndex={() => changeActiveIndex(activeIndex - 1)}
        />
      </IconTabWrapper>
    </TabsContainer>
  )
}

export default Tabs;