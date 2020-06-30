import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { css, keyframes } from '@emotion/core';

import log from "../tests/log";

const headShake = keyframes`
  0% {
    transform: translateX(0)
  }
  12.5% {
    transform: translateX(-6px) rotateY(-9deg)
  }
  37.5% {
    transform: translateX(5px) rotateY(7deg)
  }
  62.5% {
    transform: translateX(-3px) rotateY(-5deg)
  }
  87.5% {
    transform: translateX(2px) rotateY(3deg)
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
  ${props => (props.page === 3) ? `
    height: 240px;
    transition: height 400ms ease-out, max-width 150ms ease-out;
  ` : (props.page === 4) ? css`
    max-width: 120px;
    height: 40px;
    padding: 0px 10px;
    transition: height 150ms ease-out, max-width 400ms ease-out;
    z-index: 1;
    cursor: pointer;
    &:active {
      box-shadow: 0 4px 5px hsl(120,60%,40%);
      transform: translateY(2px);
    }
    &:hover > button > div {
      animation: ${bounceRight} 1s ease-in-out infinite;
    }
  ` : `
  `}
  ${props => props.errorState ? css`
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

const FormBody = ({ page, errorState, children }) => {
  console.log('FormBody Re-rendered!');
  const [buttonAttributes, setButtonAttributes] = useState({
    role: "",
    tabIndex: "-1",
    onClick: null,
    onKeyUp: null,
  });
  const ref = useRef();

  // Add submit form function and animations for page 4
  const handleInteraction = event => {
    if (event.button === 0 || event.key === 'Enter' || event.key === ' ') {
      event.stopPropagation();
      console.log('Form Submitted!');
    }
  }

  // When errorState gets set to true, FormBody will re-render with animation. Once the first iteration finishes, the animation should pause
  const handleAnimationIteration = event => {
    // Manually change DOM node instead of setting state to avoid re-render
    ref.current.style.animationPlayState = "paused"
  }

  useEffect(() => {
    // Only the onClick event of NextButton or Title can set errorState to true
    // Every other action should set errorState to false, otherwise the animation will run
    if (errorState) ref.current.style.animationPlayState = "running";
  });


  useEffect(() => {
    if (page === 4) {
      setButtonAttributes({
        role: "button",
        tabIndex: "0",
        onClick: handleInteraction,
        onKeyUp: handleInteraction,
      });
    } else {
      setButtonAttributes({
        role: "",
        tabIndex: "-1",
        onClick: null,
        onKeyUp: null,
      });
    }
  }, [page]);

  useEffect(() => {
    if (buttonAttributes.role === 'button') {
      setTimeout(() => ref.current.focus(), 400);
    }
  }, [buttonAttributes]);

  return (
    <StyledFormBody
      ref={ref}
      page={page}
      errorState={errorState}
      onAnimationIteration={handleAnimationIteration}
      {...buttonAttributes}
    >
      {children}
    </StyledFormBody>
  )
}

export default log(FormBody);