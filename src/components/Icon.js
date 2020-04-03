import React from "react";
import styled from "@emotion/styled";

const StyledIcons = styled.div`
  height: auto;  
  width: 100%;
  text-align: center;
  ${props => props.active ? `
    visibility: visible;
    ` : `
    visibility: hidden;
    transition: visibility 0s linear 600ms;
  `}
`;

const Icon = props => (
  <StyledIcons active={props.active}>
    <span className={props.className}></span>
  </StyledIcons>
)

export default Icon;