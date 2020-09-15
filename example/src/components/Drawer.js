/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";

const StyledDrawer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: inline-block;
  width: 50%;
  height: 100vh;
  background: hsl(279, 9%, 25%);
	transform: translate3d(100%,0,0);
  will-change: transform;
  visibility: hidden;
  ${props => props.isDrawerOut ? `
    transform: translate3d(0,0,0);
    visibility: visible;
    transition: transform 400ms cubic-bezier(0.190, 1.000, 0.220, 1.000);
  ` : `
  `}
`;

const Drawer = ({ isDrawerOut }) => {

  return (
    <StyledDrawer isDrawerOut={isDrawerOut}>

    </StyledDrawer>
  )
}

export default Drawer;