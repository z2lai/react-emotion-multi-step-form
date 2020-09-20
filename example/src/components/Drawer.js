/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";

const StyledDrawer = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 0;
  right: 0;
  display: inline-block;
  width: 33%;
  height: 100vh;
  padding: 20px;
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
  p, li {
    line-height: 1.6rem;
  }
  h2 {
    margin-bottom: 10px;
  }
`;

const Drawer = ({ isDrawerOut }) => {

  return (
    <StyledDrawer isDrawerOut={isDrawerOut}>
      <h1>Introduction</h1>
      <h2>Multi-step Form Benefits</h2> 
      <p>
        Multi-step forms are a great way to break long forms into multiple pieces. By allowing users to submit information in smaller chunks, you can create a positive user experience and increase conversions. Each chunk appears less intimidating and users can be encouraged to complete the form with a progress indicator.
      </p>
      <p>
        One key benefit of multi-step forms is the ability to capture sensitive information by starting with a low-friction question that engages users. In this Newsletter Subscription example, the first question is "What are your interests?" Not only is it a low friction question, it also puts the user in the frame of mind where they’re thinking about the benefit of your product/service.
      </p>
      <p>
        Other benefits include the ability to use custom formatted inputs that's optimized for mobile, and the ability to use conditional logic to personalize or pre-filter the questions at later steps.
      </p>
      <h2>Library Features</h2>
      <p>
        The main goal of this form library is to allow you to configure your own multi-step form using concise and declarative code. Other features include:
      </p>
      <ul>
        <li>Smooth animations for an interactive feel</li>
        <li>Easy keyboard-only navigation</li>
        <li>Responsive design</li>
        <li>Custom Hooks to access form state and customize navigation and progress indicator</li>
      </ul>
    </StyledDrawer>
  )
}

export default Drawer;