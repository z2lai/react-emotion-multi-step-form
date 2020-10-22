import React, { useState } from "react";
import styled from "@emotion/styled";

import '../app.css';
import SubscriptionForm from "./SubscriptionForm";
import Drawer from "./Drawer";
import { ShapeDivider } from "./StyledComponents";
import { ReactComponent as CodeIcon } from "../fonts/icomoon/svg/code.svg";
import { ReactComponent as NoteIcon } from "../fonts/icomoon/svg/note.svg";
import { ReactComponent as KeyboardIcon } from "../fonts/icomoon/svg/keyboard.svg";
import { ReactComponent as DevicesIcon } from "../fonts/icomoon/svg/devices.svg";
import CodeSnippet from './CodeSnippet';
import exampleCode from '../exampleCode';

const ContentWrapper = styled.div`
  max-width: 900px;
  margin: auto;
  padding: 0 5px;
	will-change: transform;
  transition: transform 400ms cubic-bezier(0.190, 1.000, 0.220, 1.000);
  ${props => props.isDrawerOut ? `
    transform: translate3d(-17%, 0, 0);
  ` : `
  `}
`

const App = props => {
  const [isDrawerOut, setIsDrawerOut] = useState(false);
  console.log(isDrawerOut);

  return (
    <div className="app">
      <header className="hero-banner section">
        <div className="section__container">
          <h1 className="hero-banner__title">React Emotion Multi-step Form</h1>
          <p className="hero-banner__subtitle">
            Interactive multi-step forms with concise declarative code
          </p>
          <div className="flex-row">
            <a href="#example-app" className="hero-banner__link">Example App</a>
            <a href="https://github.com/z2lai/react-emotion-multi-step-form" className="hero-banner__link">Documentation</a>
          </div>
          <video className="hero-banner__video" muted controls>
            <source src="https://lh3.googleusercontent.com/_edqdTI7djap92OY68uSqcwMkMWp6hYgV47cVAOyqPTb8Hv_MwdLqcRwM1iXEDHvrw9ROAtHTz5qGNBrhIbv3uH0M0sCaPeBt4x9X0tgwuQ9zzsAISfKSpZzHAEneN1c_-YRC0bbQw=m18" type="video/mp4" />
              Sorry, your browser doesn't support embedded videos.
        </video>
        </div>
      </header>
      <section className="section">
        <div className="section__container">
          <h2 className="section__title">Features</h2>
          <div className="flex-row">
            <div className="flex-row__flex-item feature-item">
              <CodeIcon className="feature-item__svg" />
              <h3 className="feature-item__title">Declarative Code</h3>
              <p className="feature-item__text">
                Describe what your form should look like with clear and concise code
            </p>
            </div>
            <div className="flex-row__flex-item feature-item">
              <NoteIcon className="feature-item__svg" />
              <h3 className="feature-item__title">Smooth Transitions</h3>
              <p className="feature-item__text">
                Optimized animations for a smooth interactive user experience
            </p>
            </div>
            <div className="flex-row__flex-item feature-item">
              <KeyboardIcon className="feature-item__svg" />
              <h3 className="feature-item__title">Keyboard Navigation</h3>
              <p className="feature-item__text">
                Allow users to quickly navigate through the entire form using only their keyboard
            </p>
            </div>
            <div className="flex-row__flex-item feature-item">
              <DevicesIcon className="feature-item__svg" />
              <h3 className="feature-item__title">Responsive Design</h3>
              <p className="feature-item__text">
                Build forms that look good on any device
            </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="section__container">
          <h2 id="example-app" className="section__title">Example App</h2>
        </div>
        <SubscriptionForm className="example-app" />
      </section>
      <section className="section">
        <div className="section__container">
          <h2 className="section__title">Example Code</h2>
        </div>
        <CodeSnippet className="example-code" language="jsx">
          {exampleCode}
        </CodeSnippet>
      </section>
    </div>
  );
}

export default App;
