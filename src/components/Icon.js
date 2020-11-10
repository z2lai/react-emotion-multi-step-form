import React from "react";
import styled from "@emotion/styled";

const IconWrapper = styled.div`
  flex: none;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${props => `
    ${props.isSubmitPage ? `
      opacity: 0;
      visibility: hidden;
    ` : `
      opacity: 1;
      visibility: visible;
      transition: opacity 300ms;
    `}
  `}
`;

const Icon = ({ IconComponent = null, isSubmitPage }) => (
  <IconWrapper isSubmitPage={isSubmitPage}>
    {(IconComponent) ? <IconComponent /> : null}
  </IconWrapper>
)

export default Icon;