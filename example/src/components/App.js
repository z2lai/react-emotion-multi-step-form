import React from "react";
import styled from "@emotion/styled";

import '../app.css';
import SubscriptionForm from "./SubscriptionForm";
import { ReactComponent as GithubIcon } from "../fonts/icomoon/svg/github.svg";
import { ReactComponent as CodeIcon } from "../fonts/icomoon/svg/code.svg";
import { ReactComponent as NoteIcon } from "../fonts/icomoon/svg/note.svg";
import { ReactComponent as KeyboardIcon } from "../fonts/icomoon/svg/keyboard.svg";
import { ReactComponent as DevicesIcon } from "../fonts/icomoon/svg/devices.svg";
import CodeSnippet from './CodeSnippet';

import appVideoCode from '../code-snippets/appVideoCode';
import coreComponentsCode from '../code-snippets/coreComponentsCode';
import inputComponentsCode from '../code-snippets/inputComponentsCode';

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

const App = props => (
  <div className="app">
    <header className="hero-banner section">
      <div className="section__container">
        <a href="https://github.com/z2lai/react-emotion-multi-step-form" className="hero-banner__icon-link">
          <GithubIcon />
        </a>
        <h1 className="hero-banner__title">React Emotion Multi-step Form</h1>
        <p className="hero-banner__subtitle">
          Interactive multi-step form library with concise declarative code
          </p>
        <div className="flex-row">
          <a href="#example-app" className="link link--large">Example App</a>
          <a href="#getting-started" className="link link--large">Getting Started</a>
        </div>
        <div className="hero-banner__video">
          <iframe src="https://player.vimeo.com/video/472571185?autoplay=1&loop=1&color=c9ff23&title=0&byline=0&portrait=0" frameborder="0" allow="fullscreen" allowfullscreen></iframe>
          <script src="https://player.vimeo.com/api/player.js"></script>
        </div>
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
        <h2 className="section__title">Getting Started</h2>
        <p className="section__paragraph">This library is for apps built with Create React App and styled with Emotion (see <a href="https://github.com/z2lai/react-emotion-multi-step-form#peer-dependencies" className="link">Peer Dependencies</a>). Install the library with the following command:</p>
        <pre className="section__pre"><code>npm install --save react-emotion-multi-step-form</code></pre>
      </div>
      <div className="section__container">
        <h3 className="section__heading">Core Components</h3>
        <p className="section__paragraph"><a href="https://github.com/z2lai/react-emotion-multi-step-form#formbody" className="link">FormBody</a> is the main component that accepts all the input components as children. FormBody will need to be wrapped with the higher-order component (HOC), <a href="https://github.com/z2lai/react-emotion-multi-step-form#withformcontextandtheme-higher-order-component-hoc" className="link">withFormContextAndTheme</a> in order for the form to store and access input values.</p>
      </div>
      <CodeSnippet language="jsx">
        {coreComponentsCode}
      </CodeSnippet>
      <div className="section__container">
        <h3 className="section__heading">Input Components</h3>
        <p className="section__paragraph">The library provides input components to be used for each page of the multi-step form (currently one per page). The form will transition smoothly to the next input after validating the currently active input. Every input component will have the following props:
          <ul>
            <li>name (required)</li>
            <li>caption</li>
            <li>icon</li>
            <li>validationRules</li>
          </ul>
        </p>
      </div>
      <CodeSnippet language="jsx">
        {inputComponentsCode}
      </CodeSnippet>
      <div className="section__container">
        <h3 className="section__heading">Custom Hooks</h3>
        <p className="section__paragraph">Custom hooks can be used to retrieve state or prop values such as the current error state and error message or the value of the active input. For example, the following Captions component can be built from the <a href="https://github.com/z2lai/react-emotion-multi-step-form#useinputs-hook" className="link">useInputs</a> custom hook to display the caption of the active input: </p>
      </div>
      <CodeSnippet language="jsx">
        {appVideoCode}
      </CodeSnippet>
    </section>
    <footer className="footer">
      <ul className="footer__links">
        <li>
          Copyright © 2020 <a href="https://github.com/z2lai" className="link">Zheng Lai</a>
        </li>
        <li>
          License: <a href="https://github.com/z2lai/react-emotion-multi-step-form/blob/master/LICENSE.md" className="link">
            MIT
            </a>
        </li>
        <li>
          Version: <a href="https://www.npmjs.com/package/react-emotion-multi-step-form" className="link">
            v0.7.3
            </a>
        </li>
      </ul>
    </footer>
  </div >
)

export default App;