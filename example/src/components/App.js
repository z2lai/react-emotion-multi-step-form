import React, { useState } from "react";
import styled from "@emotion/styled";

import '../app.css';
import SubscriptionForm from "./SubscriptionForm";
import Drawer from "./Drawer";
import { ReactComponent as Code } from "../fonts/icomoon/svg/code.svg";
import { ReactComponent as Note } from "../fonts/icomoon/svg/note.svg";
import { ReactComponent as Keyboard } from "../fonts/icomoon/svg/keyboard.svg";
import { ReactComponent as Devices } from "../fonts/icomoon/svg/devices.svg";

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
      <ContentWrapper isDrawerOut={isDrawerOut}>
        <h1>React Emotion Multi-step Form</h1>
        <div className="caption">
          Interactive multi-step forms with concise declarative code 
        </div>
        <h2>Basic Example App</h2>
        <SubscriptionForm
          isDrawerOut={isDrawerOut}
          setIsDrawerOut={() => setIsDrawerOut(!isDrawerOut)}
        />
        <h2>Features</h2>
        <div className="feature-section">
          <div className="feature-item">
            <Code />
            <h3>Concise Declarative Code</h3>
            <p></p>
          </div>
          <div className="feature-item">
            <Note />
            <h3>Smooth Page Transitions</h3>
            <p></p>
          </div>
          <div className="feature-item">
            <Keyboard />
            <h3>Easy Keyboard Navigation</h3>
            <p></p>
          </div>
          <div className="feature-item">
            <Devices />
            <h3>Responsive Design</h3>
            <p></p>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
}

export default App;
