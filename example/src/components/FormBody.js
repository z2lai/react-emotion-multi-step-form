import React, { useRef, useEffect } from "react";
import { css, keyframes } from '@emotion/core';
import styled from "@emotion/styled";

import useActiveIndex from "../hooks/useActiveIndex";
import useInputs from "../hooks/useInputs";

import { IconContainer, IconWrapper, InputContainer, SubmitLabel, NextButton, NextButtonIcon } from "./StyledComponents";
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
    transform: translate(-1px, -8px);
  }
  50% {
    transform: translate(-1px, 0px);
  }
`

// When interpolating keyframes into plain strings you have to wrap it in css call, like this: css`animation: ${keyframes({ /* ... */ })}`
// https://github.com/emotion-js/emotion/issues/1066#issuecomment-546703172
// How to use animation name as a partial (with other properties defined with prop values): https://styled-components.com/docs/api#keyframes
// How to use animation name inside conditional based on props: https://github.com/styled-components/styled-components/issues/397#issuecomment-275588876
const StyledFormBody = styled.div`
  margin: 0 auto 20px auto;
  max-width: 500px;
  height: 60px;
  padding: 10px;
  overflow: hidden;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 3px;
  background-color: hsl(0, 0%, 100%);
  text-align: left;
  transition: height 150ms ease-out, max-width 150ms ease-out;
  &:focus {
    outline: none;
  }
  ${props => (props.inputContainerHeight) ? `
    height: ${props.inputContainerHeight + 20}px;
    transition: height 400ms ease-out, max-width 150ms ease-out;
  ` : props.isSubmitPage ? css`
    max-width: 120px;
    height: 40px;
    padding: 0px 10px;
    z-index: 1;
    cursor: pointer;
    transition: height 150ms ease-out, max-width 400ms ease-out, transform 100ms, box-shadow: 100ms;
    &:focus {
      outline: 1px auto ${props.theme.colors.light.indigo};
    }
    &:active, &.active {
      box-shadow: 0 4px 5px hsl(120,60%,40%);
      transform: translateY(2px);
    }
    @media (prefers-reduced-motion: no-preference) {
      &:hover > button > div {
        animation: ${bounceRight} 1s ease-in-out infinite;
      }
    }
  ` : `
  `}
  ${props => props.isError ? css`
    box-shadow: 0 8px 10px hsl(16, 100%, 40%);
    animation: ${headShake} .5s  ease-in-out infinite;
  ` : `
    box-shadow: 0 8px 10px hsl(120, 60%, 40%);
    animation: none;
  `}
  h1 {
    margin: 0;
    padding: 1.5rem 0;
    font-size: 1.125rem;
    text-align: center;
  }
`;

const FormBody = ({ onSubmit, children }) => {
  console.log('FormBody rendered!');
  const { activeIndex, changeActiveIndex, activeInput, error, isSubmitPage } = useActiveIndex();
  const { inputs, inputValues } = useInputs();

  const ref = useRef();
  const buttonRef = useRef();
  
  const inputContainerHeight = activeInput ? activeInput.height : '';

  const handleAnimationIteration = event => {
    // Manually change DOM node instead of setting state to avoid re-render
    ref.current.style.animationPlayState = "paused"
  }

  const handleClick = event => {
    if (isSubmitPage && event.button === 0) {
      onSubmit(inputValues);
    }
  }

  const handleNextButtonClick = event => {
    changeActiveIndex(activeIndex + 1);
  };

  const simulateMouseEvent = (element, eventName) => {
    element.dispatchEvent(new MouseEvent(eventName, {
      view: window,
      bubbles: true,
      cancelable: true,
      button: 0
    }));
  };

  const clickButtonOnKeyDown = button => {
    button.classList.add('active');
    const handleKeyUp = event => {
      button.classList.remove('active');
      simulateMouseEvent(button, 'click')
      ref.current.removeEventListener('keyup', handleKeyUp, false);
      console.log('onKeyUp handler removed');
    }
    ref.current.addEventListener('keyup', handleKeyUp, false);
    console.log('onKeyUp handler added');
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter' && !event.repeat) {
      if (!isSubmitPage) {
        clickButtonOnKeyDown(buttonRef.current);
      } else {
        clickButtonOnKeyDown(ref.current);
      }
    }
  }

  const handleNextButtonKeyDown = event => {
    // Replace default behaviour with clickButtonOnKeyDown to streamline behaviour between Enter and Space keys
    event.preventDefault();
    event.stopPropagation(); // stop Enter or Space keys from triggering FormBody keydown handler
    clickButtonOnKeyDown(event.currentTarget);
  }

  useEffect(() => {
    if (error.state) ref.current.style.animationPlayState = "running";
  }, [error]);

  useEffect(() => {
    if (inputs.length === 0) return;
    if (!isSubmitPage) {
      console.log('activeInput to be focused:')
      console.log(activeInput);
      setTimeout(() => activeInput.node.focus(), 500);
    } else {
      setTimeout(() => ref.current.focus(), 400);
    }
  }, [inputs.length, isSubmitPage, activeInput])

  return (
    <StyledFormBody
      ref={ref}
      role={isSubmitPage ? "button" : null}
      tabIndex={isSubmitPage ? "0" : "-1"}
      inputContainerHeight={inputContainerHeight}
      isError={error.state}
      isSubmitPage={isSubmitPage}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      onAnimationIteration={handleAnimationIteration}
    >
      <IconContainer>
        <IconWrapper index={activeIndex}>
          {(inputs.length > 0) ?
            inputs.map((input, index) => 
              <Icon key={`${input.iconClassName}${index}`} className={input.iconClassName} isSubmitPage={isSubmitPage} />) :
            null
          }
        </IconWrapper>
      </IconContainer>
      <InputContainer inputContainerHeight={inputContainerHeight}>
        {children}
        <SubmitLabel isSubmitPage={isSubmitPage} />
      </InputContainer>
      <NextButton
        ref={buttonRef}
        type="button"
        isSubmitPage={isSubmitPage}
        onClick={handleNextButtonClick}
        onKeyDown={handleNextButtonKeyDown}
      >
        <NextButtonIcon />
      </NextButton>
    </StyledFormBody>
  )
};

export default FormBody;