import React, { useRef, useEffect } from "react";
import { css, keyframes } from '@emotion/core';
import styled from "@emotion/styled";

import useActiveIndex from "../core/useActiveIndex";
import useInputs from "../core/useInputs";

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
    transform: translate(0px, -1px);
  }
`

const FormBodyContainer = styled.div`
  ${props => props.isError ? css`
    animation: ${headShake} .5s  ease-in-out infinite;
  ` : `
    animation: none;
  `}
  &.active {
    transform: translateY(2px);
  }
  * {
    box-sizing: border-box;
  }
`

// When interpolating keyframes into plain strings you have to wrap it in css call, like this: css`animation: ${keyframes({ /* ... */ })}`
// https://github.com/emotion-js/emotion/issues/1066#issuecomment-546703172
// How to use animation name as a partial (with other properties defined with prop values): https://styled-components.com/docs/api#keyframes
// How to use animation name inside conditional based on props: https://github.com/styled-components/styled-components/issues/397#issuecomment-275588876
const StyledFormBody = styled.div`
  margin: 0px auto 10px auto;
  max-width: 500px;
  height: 60px;
  padding: 10px;
  overflow: hidden;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 5px 0 5px 5px;
  background-color: hsl(0, 0%, 100%);
  transition: height 150ms ease-out, max-width 150ms ease-out;
  &:focus {
    outline: none;
  }
  ${props => props.isError ? css`
    box-shadow: 0 8px 6px hsla(16, 100%, 40%, .8);
  ` : `
    box-shadow: 0 8px 6px hsla(120, 60%, 40%, .8);
  `}
  ${props => (props.inputContainerHeight) ? `
    height: ${props.inputContainerHeight + 20}px;
    transition: height 400ms ease-out, max-width 150ms ease-out;
  ` : props.isSubmitPage ? css`
    max-width: 120px;
    height: 40px;
    border-radius: 5px;
    padding: 10px 10px;
    z-index: 1;
    cursor: pointer;
    transition: height 150ms ease-out, max-width 300ms ease-out, transform 100ms, box-shadow 100ms;
    &:focus {
      border: 2px solid ${props.theme.colors.light.indigo};
      padding: 8px 8px;
    }
    &:active, &.active {
      box-shadow: 0 2px 2px hsl(120, 60%, 40%);
    }
    div {
      pointer-events: none;
    }
    @media (prefers-reduced-motion: no-preference) {
      &:focus > button > div, &:hover > button > div {
        animation: ${bounceRight} 1s ease-in-out infinite;
      }
    }
  ` : `
  `}
  h1 {
    margin: 0;
    padding: 1.5rem 0;
    font-size: 1.125rem;
    text-align: center;
  }
`

const FormBody = ({ onSubmit, children }) => {
  console.log('FormBody rendered!');
  const { activeIndex, changeActiveIndex, activeInput, error, isSubmitPage } = useActiveIndex();
  const { inputs, inputValues } = useInputs();

  const formBodyContainerRef = useRef();
  const formBodyRef = useRef();
  const buttonRef = useRef();

  const inputContainerHeight = activeInput ? activeInput.height : '';

  const handleAnimationIteration = event => {
    // Manually change DOM node instead of setting state to avoid re-render
    formBodyContainerRef.current.style.animationPlayState = "paused"
  }

  const handleSubmitClick = event => {
    if (isSubmitPage && event.button === 0) {
      onSubmit(inputValues);
    }
  }

  const handleMouseDownAndUp = event => {
    if (isSubmitPage) {
      if (event.type === 'mousedown' || event.type === 'touchstart') {
        formBodyContainerRef.current.classList.add('active');
      } else {
        formBodyContainerRef.current.classList.remove('active');
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
      formBodyRef.current.removeEventListener('keyup', handleKeyUp, false);
      console.log('onKeyUp handler removed');
    }
    formBodyRef.current.addEventListener('keyup', handleKeyUp, false);
    console.log('onKeyUp handler added');
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      if (!isSubmitPage) {
        clickOnKeyDown(event, buttonRef.current);
      } else {
        clickOnKeyDown(event, formBodyContainerRef.current);
        clickOnKeyDown(event, formBodyRef.current);
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
    if (error.state) formBodyContainerRef.current.style.animationPlayState = "running";
  }, [error]);

  useEffect(() => {
    if (inputs.length === 0) return;
    if (!isSubmitPage) {
      console.log('activeInput to be focused:')
      console.log(activeInput);
      setTimeout(() => activeInput.node.focus(), 500);
    } else {
      setTimeout(() => formBodyRef.current.focus(), 400);
    }
  }, [inputs.length, isSubmitPage, activeInput])

  return (
    <FormBodyContainer ref={formBodyContainerRef} isError={error.state} onAnimationIteration={handleAnimationIteration}>
      <Tabs
        inputs={inputs}
        activeIndex={activeIndex}
        changeActiveIndex={changeActiveIndex}
        isSubmitPage={isSubmitPage}
      />
      <StyledFormBody
        ref={formBodyRef}
        role={isSubmitPage ? "button" : null}
        tabIndex={isSubmitPage ? "0" : "-1"}
        inputContainerHeight={inputContainerHeight}
        isError={error.state}
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
      </StyledFormBody>
    </FormBodyContainer>
  )
};

export default FormBody;