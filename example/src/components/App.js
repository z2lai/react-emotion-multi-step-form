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
      <section className="hero-banner">
        <header className="hero-banner__header">
          <h1 className="hero-banner__title">React Emotion Multi-step Form</h1>
          <p className="hero-banner__subtitle">
            Interactive multi-step forms with concise declarative code
        </p>
        </header>
        <div className="hero-banner__video">
          <video muted controls>
            <source src="https://lh3.googleusercontent.com/_edqdTI7djap92OY68uSqcwMkMWp6hYgV47cVAOyqPTb8Hv_MwdLqcRwM1iXEDHvrw9ROAtHTz5qGNBrhIbv3uH0M0sCaPeBt4x9X0tgwuQ9zzsAISfKSpZzHAEneN1c_-YRC0bbQw=m18" type="video/mp4" />
              Sorry, your browser doesn't support embedded videos.
          </video>
        </div>
      </section>
      <section className="section">
        <h2 className="section__title">Features</h2>
        <div className="flex-row">
          <div className="feature-item">
            <CodeIcon />
            <h3>Concise Declarative Code</h3>
            <p></p>
          </div>
          <div className="feature-item">
            <NoteIcon />
            <h3>Smooth Page Transitions</h3>
            <p></p>
          </div>
          <div className="feature-item">
            <KeyboardIcon />
            <h3>Easy Keyboard Navigation</h3>
            <p></p>
          </div>
          <div className="feature-item">
            <DevicesIcon />
            <h3>Responsive Design</h3>
            <p></p>
          </div>
        </div>
      </section>
      <h2>Basic Example App</h2>
      <SubscriptionForm
        isDrawerOut={isDrawerOut}
        setIsDrawerOut={() => setIsDrawerOut(!isDrawerOut)}
      />
    </div>
  );
}

export default App;
