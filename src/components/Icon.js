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

const Icon = ({ icon, isSubmitPage }) => {
  const IconComponent = icon;

  return (
    <IconWrapper isSubmitPage={isSubmitPage}>
      <IconComponent />
    </IconWrapper>
  )
}

export default Icon;