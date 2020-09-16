/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";

const StyledDrawer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: inline-block;
  width: 33%;
  height: 100vh;
  background: hsl(279, 25%, 25%);
  color: hsl(0, 100%, 99%);
	transform: translate3d(100%, 0, 0);
  will-change: transform;
  visibility: hidden;
  ${props => props.isDrawerOut ? `
    transform: translate3d(0, 0, 0);
    visibility: visible;
    transition: transform 400ms cubic-bezier(0.190, 1.000, 0.220, 1.000);
  ` : `
  `}
`;

const Drawer = ({ isDrawerOut }) => {

  return (
    <StyledDrawer isDrawerOut={isDrawerOut}>
      <h1>Introduction</h1>
      <p>
        Multi-step forms are a great way to break long forms into multiple pieces. By allowing users to submit information in smaller chunks, you can create a positive user experience and increase conversions. Each chunk appears less intimidating and users can be encouraged to complete the form with a progress indicator.
      </p>
      <p>
        One key advantage of multi-step forms is the ability to capture sensitive information by starting with a low-friction question that engages users. In this Newsletter Subscription example, the first question is "What are your interests?" Not only is it a low friction question, it also puts the user in the frame of mind where they’re thinking about the benefit of your product/service.
      </p>
      <p>
        Other advantages include the ability to use custom formatted inputs that's optimized for mobile, and also the ability to use conditional logic to personalize or pre-filter the questions at later steps.
      </p>
      <h1>Library Features</h1>
      <ul>
        <li>Concise declarative input configuration - icon, page height and input validation</li>
        <li>Smooth page transitions</li>
        <li>Supports keyboard-only navigation</li>
        <li>Mobile-friendly design</li>
        <li>Custom Hooks to re-use page change logic</li>
      </ul>
    </StyledDrawer>
  )
}

export default Drawer;