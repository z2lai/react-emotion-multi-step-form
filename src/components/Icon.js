import React from "react";
import styled from "@emotion/styled";

import log from "../tests/log";

const StyledIcons = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 600ms, transform 400ms;
  ${props => `
    ${(props.page === 4) ? `
      opacity: 0;
      transform: rotate(360deg);
    ` : `
    `}
  `}
`;

const Icon = ({ className, page }) => (
  <StyledIcons page={page}>
    <div className={className}></div>
  </StyledIcons>
)

export default Icon;