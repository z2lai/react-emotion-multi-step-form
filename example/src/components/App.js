import React from "react";

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

const App = props => (
  <div className="app">
    <header className="hero-banner section">
      <div className="section__container">
        <a href="https://github.com/z2lai/react-emotion-multi-step-form" className="hero-banner__icon-link">
          <GithubIcon />
        </a>
        <h1 id="react-emotion-multi-step" className="hero-banner__title">React Emotion Multi-step Form</h1>
        <p className="hero-banner__subtitle">
          Interactive multi-step form library with concise declarative code
          </p>
        <div className="flex-row">
          <a href="#example-app" className="link link--large">Example App Demo</a>
          <a href="#getting-started" className="link link--large">Get Started</a>
        </div>
        <div className="hero-banner__video">
          <iframe src="https://player.vimeo.com/video/480101210?autoplay=1&loop=1&title=0&byline=0&portrait=0" title="Example App Demo Video" width="640" height="344" frameBorder="0" allow="autoplay; fullscreen"></iframe>
        </div>
      </div>
    </header>
    <section className="section">
      <div className="section__container">
        <h2 className="section__title">Features</h2>
        <div className="flex-row flex-row--space-around">
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
      <div className="section__container flex-row">
        <a href="https://codesandbox.io/s/react-emotion-multi-step-form-v09-subscription-form-h6mpc?file=/src/App.js" className="link link--large">CodeSandbox</a>
        <a href="#getting-started" className="link link--large">Get Started</a>
      </div>
    </section>
    <section className="section">
      <div className="section__container">
        <h2 id="example-app" className="section__title">Example App Code</h2>
      </div>
      <CodeSnippet language="jsx">
        {appVideoCode}
      </CodeSnippet>
      <div className="section__container flex-row">
        <a href="https://github.com/z2lai/react-emotion-multi-step-form#api-reference" className="link link--large">API Reference</a>
      </div>
    </section>
    <section className="section">
      <div className="section__container">
        <h2 id="getting-started" className="section__title">Getting Started</h2>
        <p className="text-container">This library is for apps built with Create React App (CRA) and styled with Emotion (see <a href="https://github.com/z2lai/react-emotion-multi-step-form#peer-dependencies" className="link">Peer Dependencies</a>). Install the library with the following command:
        </p>
        <pre className="text-container code">
          <code>npm install --save react-emotion-multi-step-form</code>
        </pre>
      </div>
      <div className="section__container">
        <h3 className="section__heading">Core Components</h3>
        <p className="text-container">
          <a href="https://github.com/z2lai/react-emotion-multi-step-form#formbody" className="link">FormBody</a> is the main component that includes the body of the multi-step form, the navigation buttons, the label tabs and the Submit button. The app needs to be wrapped with the higher-order component (HOC), <a href="https://github.com/z2lai/react-emotion-multi-step-form#withformcontextandtheme-higher-order-component-hoc" className="link">withFormContextAndTheme</a>, in order for all components to access form state in Context via a custom hook (see <a href="#custom-hook" className="link">Custom Hook</a> section).
        </p>
      </div>
      <CodeSnippet language="jsx">
        {coreComponentsCode}
      </CodeSnippet>
      <div className="section__container">
        <h3 id="input-components" className="section__heading">Input Components</h3>
        <p className="text-container">
          The library provides custom <a href="https://github.com/z2lai/react-emotion-multi-step-form#input-components" className="link">input components</a> which are passed to FormBody as children and displayed on separate "pages" of the multi-step form. All input values are automatically made available for both form validation and submission. Upon clicking the "Next Page" button, the active input's value is validated and stored in form state before the next input is displayed.
        </p>
        <p className="text-container">
          The following props are the base props for all input components in this library:
        </p>
        <ul className="text-container list">
          <li><strong>name</strong> - unique identifier for input to be properly registered in Context</li>
          <li><strong>onChange</strong> - callback invoked when controlled input value changes</li>
          <li><strong>caption</strong> - additional text to prompt the user for input (displayed by <a href="#custom-hook" className="link">Captions</a> component)</li>
          <li><strong>icon</strong> - <a href="https://create-react-app.dev/docs/adding-images-fonts-and-files/#adding-svgs" className="link">SVG icon imported as a component</a> to be displayed beside input</li>
          <li><strong>height</strong> - height (in pixels) of the form body when input is active</li>
          <li><strong>validationRules</strong> - an object containing input <a href="https://github.com/z2lai/react-emotion-multi-step-form#validation-rules" className="link">validation rules</a> that align with the HTML5 form validation standard (also accepts a custom validation function)</li>
        </ul>
      </div>
      <CodeSnippet language="jsx">
        {inputComponentsCode}
      </CodeSnippet>
      <div className="section__container">
        <h3 id="custom-hook" className="section__heading">Custom Hook</h3>
        <p className="text-container">
          The custom hook, <a href="https://github.com/z2lai/react-emotion-multi-step-form#useinputs-custom-hook" className="link">useInputs</a>, can be used to retrieve form state values such as the current error state and error message. useInputs can also be used to retrieve certain input prop values.
        </p>
        <p className="text-container">
          For example, the <a href="https://github.com/z2lai/react-emotion-multi-step-form#captions" className="link">Captions</a> component is built with useInputs to display the caption of the active input:
        </p>
      </div>
      <CodeSnippet language="jsx">
        {captionsComponentCode}
      </CodeSnippet>
    </section>
    <div className="flex-row">
      <a href="#react-emotion-multi-step" className="link link--large">Back to Top</a>
    </div>
    <footer className="footer">
      <ul className="footer__list">
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
            v0.10.0
            </a>
        </li>
      </ul>
    </footer>
  </div >
)

export default App;