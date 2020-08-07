import React from "react";
import styled from "@emotion/styled";

const IconWrapper = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 300ms, transform 300ms;
  ${props => `
    ${props.isSubmitPage ? `
      opacity: 0;
      transform: rotate(720deg);
    ` : `
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