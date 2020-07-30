import React from "react";
import styled from "@emotion/styled";

// import "../fonts/icomoon/style.css"

const StyledIcons = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 600ms, transform 400ms;
  ${props => `
    ${props.isSubmitPage ? `
      opacity: 0;
      transform: rotate(360deg);
    ` : `
    `}
  `}
`;

const Icon = ({ className, isSubmitPage }) => (
  <StyledIcons isSubmitPage={isSubmitPage}>
    <div className={className}></div>
  </StyledIcons>
)

export default Icon;