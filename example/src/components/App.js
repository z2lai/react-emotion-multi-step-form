import React from "react";
import styled from "@emotion/styled";

import '../app.css';
import SubscriptionForm from "./SubscriptionForm";
import { ReactComponent as GithubIcon } from "../assets/svg/github.svg";
import { ReactComponent as CodeIcon } from "../assets/svg/code.svg";
import { ReactComponent as NoteIcon } from "../assets/svg/note.svg";
import { ReactComponent as KeyboardIcon } from "../assets/svg/keyboard.svg";
import { ReactComponent as DevicesIcon } from "../assets/svg/devices.svg";
import CodeSnippet from './CodeSnippet';

import appVideoCode from '../code-snippets/appVideoCode';
import coreComponentsCode from '../code-snippets/coreComponentsCode';
import inputComponentsCode from '../code-snippets/inputComponentsCode';
import captionsComponentCode from '../code-snippets/captionsComponentCode';

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
        <h2 id="example-app" className="section__title">Example App Demo</h2>
      </div>
      <SubscriptionForm className="example-app" />
    </section>
    <section className="section">
      <div className="section__container">
        <h2 id="example-app" className="section__title">Example App Code</h2>
      </div>
      <CodeSnippet language="jsx">
        {appVideoCode}
      </CodeSnippet>
    </section>
    <section className="section">
      <div className="section__container">
        <h2 className="section__title">Getting Started</h2>
        <p className="section__paragraph">This library is for apps built with Create React App (CRA) and styled with Emotion (see <a href="https://github.com/z2lai/react-emotion-multi-step-form#peer-dependencies" className="link">Peer Dependencies</a>). Install the library with the following command:</p>
        <pre className="section__pre"><code>npm install --save react-emotion-multi-step-form</code></pre>
      </div>
      <div className="section__container">
        <h3 className="section__heading">Core Components</h3>
        <p className="section__paragraph">
          <a href="https://github.com/z2lai/react-emotion-multi-step-form#formbody" className="link">FormBody</a> is the main component that includes the body of the multi-step form, the label tabs and the navigation buttons. The app needs to be wrapped with the higher-order component (HOC), <a href="https://github.com/z2lai/react-emotion-multi-step-form#withformcontextandtheme-higher-order-component-hoc" className="link">withFormContextAndTheme</a>, in order for all components to access shared state in Context via a custom hook (see <a href="#custom-hook" className="link">Custom Hook</a> section).
        </p>
      </div>
      <CodeSnippet language="jsx">
        {coreComponentsCode}
      </CodeSnippet>
      <div className="section__container">
        <h3 id="input-components" className="section__heading">Input Components</h3>
        <p className="section__paragraph">
          The library provides custom input components which are passed to FormBody as children and displayed one at a time on separate "pages" of the multi-step form. All input values are automatically made available for both form validation and submission. Upon clicking the "Next Page" button, the active input's value is validated and stored in the form's shared state before the next input is displayed.
        </p>
        <p className="section__paragraph">
          The following props are the base props for all input components in this library:
          <ul>
            <li><strong>name</strong> - unique identifier for each input to be properly registered in Context</li>
            <li><strong>caption</strong> - additional text to provide a hint for the input (displayed by <a href="" className="link">caption</a> component)</li>
            <li><strong>icon</strong> - <a href="https://github.com/z2lai/react-emotion-multi-step-form#importing-svg-icons-as-react-components" className="link">SVG icon imported as a component</a> using SVGR (built-in with CRA) to be displayed beside each input</li>
            <li><strong>validationRules</strong> - an object containing input <a href="https://github.com/z2lai/react-emotion-multi-step-form#validation-rules" className="link">validation rules</a> that align with the existing HTML standard for form validation (also accepts custom validation functions).</li>
          </ul>
        </p>
      </div>
      <CodeSnippet language="jsx">
        {inputComponentsCode}
      </CodeSnippet>
      <div className="section__container">
        <h3 id="custom-hook" className="section__heading">Custom Hook</h3>
        <p className="section__paragraph">
          The custom hook, <a href="https://github.com/z2lai/react-emotion-multi-step-form#useinputs-hook" className="link">useInputs</a>, can be used to retrieve shared state values such as the current error state and error message. useInputs can also be used to retrieve certain input prop values. For example, the following Captions component is built with useInputs to display the caption of the active input:
        </p>
        <CodeSnippet language="jsx">
          {captionsComponentCode}
        </CodeSnippet>
      </div>
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