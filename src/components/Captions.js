/** @jsx jsx */
import { Fragment } from "react";
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import PropTypes from 'prop-types';

import useInputs from "../core/useInputs";

const StyledCaption = styled.span`
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
  @media (min-width: 481px) {
    height: 2rem;
  }
`

const Caption = ({ caption, isActive }) => (
  <StyledCaption isActive={isActive}>
    {caption}
  </StyledCaption>
)

const Captions = ({ callToActionText }) => {
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
          <Caption key="CTA" caption={callToActionText} isActive={isSubmitPage} />
        </Fragment>
        : null
      }
    </CaptionsContainer>
  )
}

Captions.propTypes = { callToActionText: PropTypes.string.isRequired };

export default Captions;