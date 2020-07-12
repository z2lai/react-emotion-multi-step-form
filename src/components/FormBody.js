import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { css, keyframes } from '@emotion/core';

import useActiveIndex from "../hooks/useActiveIndex";
import useError from '../hooks/useError';
import useInputs from "../hooks/useInputs";
import { IconContainer, IconWrapper, InputContainer, SubmitLabel, NextButton, NextButtonIcon } from "./StyledComponents";
import Icon from "./Icon";

import log from "../tests/log";

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
  transition: height 150ms ease-out, max-width 150ms ease-out;
  padding: 10px;
  overflow: hidden;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 3px;
  background-color: hsl(0, 0%, 100%);
  text-align: left;
  &:focus {
    outline: none;
  }
  ${props => (props.activePage === 3) ? `
    height: 240px;
    transition: height 400ms ease-out, max-width 150ms ease-out;
  ` : props.isSubmitPage ? css`
    max-width: 120px;
    height: 40px;
    padding: 0px 10px;
    transition: height 150ms ease-out, max-width 400ms ease-out, transform 100ms, box-shadow: 100ms;
    z-index: 1;
    cursor: pointer;
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

const FormBody = React.forwardRef(({ buttonRef, children }, ref) => {
  console.log('FormBody rendered!');
  const inputs = useInputs()[0];
  const [activeIndex, changeActiveIndex, isSubmitPage] = useActiveIndex();
  const [error] = useError();

  // Add submit form function and animations for page 4
  const handleSubmit = event => {
    if (event.button === 0) {
      console.log('Form Submitted!');
    }
  }
  const buttonAttributesRef = useRef({
    disabled: {
      role: "",
      tabIndex: "-1",
      onClick: null,
    },
    enabled: {
      role: "button",
      tabIndex: "0",
      onClick: handleSubmit,
    }
  });
  const [buttonAttributes, setButtonAttributes] = useState(buttonAttributesRef.current.disabled);

  useEffect(() => {
    // Only the onClick event of NextButton or Title can set error state to true
    // Every other action should set error state to false, otherwise the animation will run
    if (error.state) ref.current.style.animationPlayState = "running";
  });

  useEffect(() => {
    if (isSubmitPage) {
      setButtonAttributes(buttonAttributesRef.current.enabled);
    } else {
      setButtonAttributes(buttonAttributesRef.current.disabled);
    }
  }, [activeIndex]);

  useEffect(() => {
    if (buttonAttributes.role === 'button') {
      // setTimeout(() => ref.current.focus(), 400);
      ref.current.focus();
    }
  }, [buttonAttributes]);

  // When error state gets set to true, FormBody will re-render with animation. Once the first iteration finishes, the animation should pause
  const handleAnimationIteration = event => {
    // Manually change DOM node instead of setting state to avoid re-render
    ref.current.style.animationPlayState = "paused"
  }

  const handleNext = event => {
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

  // const handleKeyboardEvent = event => {
  //   if (event.key === 'Enter') {
  //     console.log(buttonRef);
  //     if (event.type === 'keydown') simulateMouseEvent(buttonRef.current, 'mousedown')
  //     else if (event.type === 'keyup') {
  //       simulateMouseEvent(buttonRef.current, 'mouseup')
  //       simulateMouseEvent(buttonRef.current, 'click')
  //     }
  //   }
  // }

  // const returnHandleKeyDown = event => {
  //   let isHotkeyActive = false;
  //   return event => {
  //     console.log(isHotkeyActive);
  //     if (!isHotkeyActive && event.key === 'Enter') {
  //       isHotkeyActive = true;
  //       buttonRef.current.classList.add('active');
  //       const handleKeyUp = event => {
  //         isHotkeyActive = false;
  //         buttonRef.current.classList.remove('active');
  //         simulateMouseEvent(buttonRef.current, 'click')
  //         ref.current.removeEventListener('keyup', handleKeyUp, false);
  //       }
  //       ref.current.addEventListener('keyup', handleKeyUp, false);
  //     }
  //   }
  // }

  const handleKeyDown = event => {
    if (event.key === 'Enter' && !event.repeat) {
      if (!isSubmitPage) {
        buttonRef.current.classList.add('active');
        const handleKeyUp = event => {
          buttonRef.current.classList.remove('active');
          simulateMouseEvent(buttonRef.current, 'click')
          ref.current.removeEventListener('keyup', handleKeyUp, false);
        }
        ref.current.addEventListener('keyup', handleKeyUp, false);
      } else {
        ref.current.classList.add('active');
        const handleKeyUp = event => {
          ref.current.classList.remove('active');
          simulateMouseEvent(ref.current, 'click')
          ref.current.removeEventListener('keyup', handleKeyUp, false);
        }
        ref.current.addEventListener('keyup', handleKeyUp, false);
      }
    }
  }

  return (
    <StyledFormBody
      ref={ref}
      isError={error.state}
      onKeyDown={handleKeyDown}
      onAnimationIteration={handleAnimationIteration}
      // pass in height properties from active input
      isSubmitPage={isSubmitPage}
      {...buttonAttributes}
    >
      <IconContainer>
        <IconWrapper index={activeIndex}>
          {(inputs.length > 0) ? 
            inputs.map(input => <Icon key={input.iconClassName} className={input.iconClassName} isSubmitPage={isSubmitPage} />) :
            null
          }
        </IconWrapper>
      </IconContainer>
      <InputContainer>
        {children}
        <SubmitLabel isSubmitPage={isSubmitPage}/>
      </InputContainer>
      <NextButton
        ref={buttonRef}
        onClick={handleNext}
        isSubmitPage={isSubmitPage}
      >
        <NextButtonIcon />
      </NextButton>
    </StyledFormBody>
  )
});

export default FormBody;