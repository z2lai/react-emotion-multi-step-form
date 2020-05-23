import React from "react";
import styled from "@emotion/styled";

const StyledIcons = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${props => props.active ? `
    visibility: visible;
  ` : `
    visibility: hidden;
    transition: visibility 0s linear 600ms;
  `}
`;

const Icon = props => (
  <StyledIcons active={props.active}>
    <div className={props.className}></div>
  </StyledIcons>
)

export default Icon;