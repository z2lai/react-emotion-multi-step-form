import React, { useRef, useEffect } from "react";
import { css, keyframes } from '@emotion/core';
import styled from "@emotion/styled";

import useActiveIndex from "../core/useActiveIndex";
import useInputs from "../core/useInputs";
import useScaleAnimation from "../core/useScaleAnimation";

import Tabs from "./Tabs";
import { IconContainer, IconsWrapper, InputContainer, SubmitLabel, NextButton, NextButtonIcon } from "./StyledComponents";
import Icon from "./Icon";

const headShake = keyframes`
  0% {
    transform: translateX(0)
  }
  12.5% {
    transform: translateX(6px) rotateY(9deg)
  }
  37.5% {
    transform: translateX(-5px) rotateY(-7deg)
  }
  62.5% {
    transform: translateX(3px) rotateY(5deg)
  }
  87.5% {
    transform: translateX(-2px) rotateY(-3deg)
  }
  100% {
    transform: translateX(0)
  }
`

const bounceRight = keyframes`
  0%,
  100% {
    transform: translate(-8px, -1px);
  }
  50% {
    transform: translate(-2px, -1px);
  }
`

const FormBodyWrapper = styled.div`
  ${props => props.isError ? css`
    animation: ${headShake} .5s  ease-in-out infinite;
  ` : `
    animation: none;
  `}
  &.active {
    transform: translateY(2px);
  }
  &.active > div:last-child {
    box-shadow: 0 2px 2px hsl(120, 60%, 40%);
  }
  * {
    box-sizing: border-box;
  }
`

// When interpolating keyframes into plain strings you have to wrap it in css call, like this: css`animation: ${keyframes({ /* ... */ })}`
// https://github.com/emotion-js/emotion/issues/1066#issuecomment-546703172
// How to use animation name as a partial (with other properties defined with prop values): https://styled-components.com/docs/api#keyframes
// How to use animation name inside conditional based on props: https://github.com/styled-components/styled-components/issues/397#issuecomment-275588876
const PageContainer = styled.div`
  margin: 0px auto;
  max-width: 500px;
  height: 60px;
  ${props => `
    border-bottom-left-radius: ${5 / props.widthScale}px ${5 / props.heightScale}px;
    border-bottom-right-radius: ${5 / props.widthScale}px ${5 / props.heightScale}px;
    ${props.isSubmitPage ? `
      border-top-left-radius: ${5 / props.widthScale}px ${5 / props.heightScale}px;
      border-top-right-radius: ${5 / props.widthScale}px ${5 / props.heightScale}px;
    ` : `
    `}
  `}
  overflow: hidden;
  background-color: hsl(0, 0%, 100%);
  ${props => props.isError ? css`
    box-shadow: 0 ${5 / props.heightScale}px ${6 / props.heightScale}px hsla(16, 100%, 40%, .8);
  ` : `
    box-shadow: 0 ${5 / props.heightScale}px ${6 / props.heightScale}px hsla(120, 60%, 40%, .8);
  `}
  ${props => css`
    transform-origin: center top;
    animation-name: ${keyframes(props.scaleAnimation)};
    animation-duration: 400ms;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  `}
`

const PageWrapper = styled.div`
  padding: 10px 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  align-items: flex-start;
  ${props => css`
    transform-origin: left top;
    animation-name: ${keyframes(props.inverseScaleAnimation)};
    animation-duration: 400ms;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  `}
  &:focus {
    outline: none;
  }
  ${props => props.isSubmitPage ? css`
    width: 110px;
    height: 40px;
    border-radius: 5px;
    padding: 10px 3px;
    z-index: 1;
    cursor: pointer;
    &:focus {
      border: 2px solid ${props.theme.colors.light.indigo};
      padding: 8px 1px;
    }
    div {
      pointer-events: none;
    }
    @media (prefers-reduced-motion: no-preference) {
      &:focus > button > div, &:hover > button > div {
        animation: ${bounceRight} .8s ease-in-out infinite;
      }
    }
  ` : `
  `}
`

const FormBody = ({ onSubmit, children }) => {
  console.log('FormBody rendered!');
  const { activeIndex, changeActiveIndex, activeInput, error, isSubmitPage } = useActiveIndex();
  const { inputs, inputValues } = useInputs();

  const formBodyWrapperRef = useRef();
  const pageWrapperRef = useRef();
  const buttonRef = useRef();
  const basePageWidthRef = useRef();
  console.log(basePageWidthRef);

  const BASE_PAGE_HEIGHT = 60;
  const SUBMIT_PAGE_WIDTH = 110;
  const SUBMIT_PAGE_HEIGHT = 40;

  const pageRelativeWidth = isSubmitPage ? SUBMIT_PAGE_WIDTH / basePageWidthRef.current : 1;
  const inputContainerHeight = (activeInput && activeInput.height) ? activeInput.height : null;
  const pageHeight = inputContainerHeight ? inputContainerHeight + 20
    : isSubmitPage ? SUBMIT_PAGE_HEIGHT
      : BASE_PAGE_HEIGHT;
  const pageRelativeHeight = pageHeight / BASE_PAGE_HEIGHT;

  const { scaleAnimation, inverseScaleAnimation } = useScaleAnimation(pageRelativeWidth, pageRelativeHeight);

  const handleAnimationIteration = event => {
    // Manually change DOM node instead of setting state to avoid re-render
    formBodyWrapperRef.current.style.animationPlayState = "paused"
  }

  const handleSubmitClick = event => {
    if (isSubmitPage && event.button === 0) {
      onSubmit(inputValues);
    }
  }

  const handleMouseDownAndUp = event => {
    if (isSubmitPage) {
      if (event.type === 'mousedown' || event.type === 'touchstart') {
        formBodyWrapperRef.current.classList.add('active');
      } else {
        formBodyWrapperRef.current.classList.remove('active');
      }
    }
  }

  const simulateMouseEvent = (element, eventName) => {
    element.dispatchEvent(new MouseEvent(eventName, {
      view: window,
      bubbles: true,
      cancelable: true,
      button: 0
    }));
  };

  const clickOnKeyDown = (event, button) => {
    if (event.repeat) return;
    const node = button || event.currentTarget;
    node.classList.add('active');

    const handleKeyUp = event => {
      node.classList.remove('active');
      simulateMouseEvent(node, 'click')
      pageWrapperRef.current.removeEventListener('keyup', handleKeyUp, false);
      console.log('onKeyUp handler removed');
    }
    pageWrapperRef.current.addEventListener('keyup', handleKeyUp, false);
    console.log('onKeyUp handler added');
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      if (!isSubmitPage) {
        clickOnKeyDown(event, buttonRef.current);
      } else {
        clickOnKeyDown(event, formBodyWrapperRef.current);
        clickOnKeyDown(event, pageWrapperRef.current);
      }
    }
  }

  const handleNextButtonClick = event => {
    changeActiveIndex(activeIndex + 1);
  };

  const handleNextButtonKeyDown = event => {
    // Replace default behaviour with clickButtonOnKeyDown to streamline behaviour between Enter and Space keys
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation(); // stop Enter or Space keys from triggering FormBody keydown handler
      clickOnKeyDown(event);
    }
  }

  useEffect(() => {
    console.log('Calculate original width effect run');
    const boundingClientRect = pageWrapperRef.current.getBoundingClientRect();
    basePageWidthRef.current = boundingClientRect.width;
    console.log(basePageWidthRef.current);
  }, []);

  useEffect(() => {
    if (error.state) formBodyWrapperRef.current.style.animationPlayState = "running";
  }, [error]);

  useEffect(() => {
    if (inputs.length === 0) return;
    if (!isSubmitPage) {
      console.log('activeInput to be focused:')
      console.log(activeInput);
      setTimeout(() => activeInput.node.focus(), 450);
    } else {
      setTimeout(() => pageWrapperRef.current.focus(), 450);
    }
  }, [inputs.length, isSubmitPage, activeInput])

  return (
    <FormBodyWrapper ref={formBodyWrapperRef} isError={error.state} onAnimationIteration={handleAnimationIteration}>
      <Tabs
        basePageWidth={basePageWidthRef.current}
        inputs={inputs}
        activeIndex={activeIndex}
        changeActiveIndex={changeActiveIndex}
        activeInput={activeInput}
        isSubmitPage={isSubmitPage}
      />
      <PageContainer
        inputContainerHeight={inputContainerHeight}
        isError={error.state}
        widthScale={pageRelativeWidth}
        heightScale={pageRelativeHeight}
        scaleAnimation={scaleAnimation}
        isSubmitPage={isSubmitPage}
      >
        <PageWrapper
          ref={pageWrapperRef}
          role={isSubmitPage ? "button" : null}
          tabIndex={isSubmitPage ? "0" : "-1"}
          inverseScaleAnimation={inverseScaleAnimation}
          isSubmitPage={isSubmitPage}
          onClick={handleSubmitClick}
          onKeyDown={handleKeyDown}
          onMouseDown={handleMouseDownAndUp}
          onMouseUp={handleMouseDownAndUp}
          onTouchStart={handleMouseDownAndUp}
          onTouchEnd={handleMouseDownAndUp}
        >
          <IconContainer>
            <IconsWrapper index={Math.min(activeIndex, inputs.length - 1)}>
              {(inputs.length > 0) ?
                inputs.map((input, index) => <Icon key={`${index}${input.name}`} icon={input.icon} isSubmitPage={isSubmitPage} />)
                : null
              }
            </IconsWrapper>
          </IconContainer>
          <InputContainer inputContainerHeight={inputContainerHeight}>
            {children}
            <SubmitLabel isSubmitPage={isSubmitPage} />
          </InputContainer>
          <NextButton
            ref={buttonRef}
            type="button"
            disabled={isSubmitPage}
            onClick={handleNextButtonClick}
            onKeyDown={handleNextButtonKeyDown}
          >
            <NextButtonIcon />
          </NextButton>
        </PageWrapper>
      </PageContainer>
    </FormBodyWrapper>
  )
};

export default FormBody;