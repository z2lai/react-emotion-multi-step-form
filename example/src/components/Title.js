/** @jsx jsx */
import { useState, useEffect } from "react";
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";

//? Change this to a link element for accessibility?
const StyledTitle = styled.span`
  margin: 5px 0;
  text-transform: capitalize;
  transition: all 600ms;
  ${props => props.active ? `
    color: ${props.theme.colors.dark.indigo};  
  ` : props.activated ? `
    color: ${props.theme.colors.extraDark.indigo};
    cursor: pointer;
  ` : `
    color: ${props.theme.colors.white};  
    opacity: 0.5;
  `}
`;

const Title = ({ active, value, page, changeActivePage }) => {
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    if (active && !activated) {
      setActivated(true);
    }
  }, [active, activated])

  const handleClick = event => {
    if (activated && !active) {
      console.log('click!');
      changeActivePage(page);
    }
  }

  return (
    <StyledTitle active={active} activated={activated} onClick={handleClick}>
      {value}
    </StyledTitle>
  )
}

export default Title;