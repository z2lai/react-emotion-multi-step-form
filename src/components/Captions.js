/** @jsx jsx */
import { Fragment } from "react";
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";

import useInputs from "../core/useInputs";

const StyledCaptions = styled.span`
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

export const CaptionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  height: 3rem;
  font-size: 1.25rem;
`

const Caption = ({ caption, isActive }) => (
  <StyledCaptions isActive={isActive}>
    {caption}
  </StyledCaptions>
)

const Captions = ({ callToActionCaption }) => {
  const { inputs, activeIndex, isSubmitPage } = useInputs();

  return (
    <CaptionsContainer>
      {(inputs.length > 0) ?
        <Fragment>
          {inputs.map((input, index) => (
            <Caption
              key={`${index}${input.name}`}
              caption={input.caption}
              isActive={index === activeIndex}
            />
          ))}
          <Caption key="CTA" caption={callToActionCaption} isActive={isSubmitPage} />
        </Fragment>
        : null
      }
    </CaptionsContainer>
  )
}

export default Captions;