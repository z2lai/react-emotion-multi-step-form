# React Emotion Multi-step Form

> A multi-step form component library built with React and styled with Emotion

[![NPM](https://img.shields.io/npm/v/react-emotion-multi-step-form.svg)](https://www.npmjs.com/package/react-emotion-multi-step-form)

[//Links to Live Demos, Sandbox, Issues]

## Introduction
An easy to setup form component library where input components are displayed in a multi-step form format (one input per page) with smooth page transitions. It's built with React hooks and React Context API so that the multi-step form logic and values can be reused for further customization of the UI/UX.

[//Add GIF showing full demo app in action]
Demo the live examples [here](http://z2lai.github.io/react-emotion-multi-step-form), which also include code samples.

## Features

### Current Features
* Concise declarative input configuration - icon, page height and input validation
* Supports SVG icons imported as React components (using SVGR that's built-in with Create-React-App)
* Supports keyboard-only navigation
* Smooth Page transition animations
* Custom Hooks to re-use page change logic
* Context containing shared state for all form field values
* Three Input Components:
 1. Text Input with different types (e.g. text, email, phone, etc.)
 2. Single-select Input - Radio Input with declarative configuration of radio options
 3. Multi-select Input - Multi-select Combobox with Autocomplete and Typeahead (Checkbox or Tag Cloud Format)

### Feature Roadmap
* Responsive and mobile-friendly components
* Customizable theme
* More props to customize styling
* More input validation options (e.g. maxLength, min, max, pattern, custom validation function)
* More Input Components:
 1. Range Input (Slider)
 2. Toggle/Switch Input
 3. Single-select Input - Single-select Combobox with Autocomplete
* Ability to have multiple inputs on one page with declarative configuration
* Test Coverage
* Web Accessibility (WAI-ARIA compliance)
* Prop-types
* Typescript support

## Quickstart
```jsx
import React from 'react';
import { 
  useActiveIndex, 
  withFormContextAndTheme, 
  FormBody, 
  TextInput, 
  RadioControl, 
  RadioOption 
} from "react-emotion-multi-step-form";

// Import SVG icons as React components
import { ReactComponent as LinkIcon } from "./icons/link.svg";
import { ReactComponent as TreeIcon } from "./icons/tree.svg";
import { ReactComponent as PriceTagsIcon } from "./icons/price-tags.svg";

function App() {
  const { error } = useActiveIndex(); // grab page input's error message
  const handleSubmit = data => {
    console.log(data);
  };
  
  return (
    <div className="App">
      <FormBody onSubmit={handleSubmit}>
        <TextInput
          name="firstname" // name of each input component must be unique
          label="Firstname" // label will appear above the input as a tab
          icon={LinkIcon}
          validationRules={{ required: true }} 
        />
        <TextInput
          name="lastname"
          label={"Lastname"} 
          icon={TreeIcon} // icon will appear beside input component
          validationRules={{ required: true }} // default error message
        />
        <RadioControl
          name="gender"
          label="Gender" 
          icon={PriceTagsIcon}
          validationRules={{ required: 'Please select a gender' }} // custom error message
        >
          <RadioOption value="Male" />
          <RadioOption value="Female" />
          <RadioOption value="Other" />
        </RadioControl>
      </FormBody>
      <div style={{ height: "20px", margin: "0 auto 5px auto", color: "red" }}>
        {error.message}
      </div>
    </div>
  );
};

export default withFormContextAndTheme(App); // Wrap component with React Context.Provider and Emotion ThemeProvider
```
Demo the quickstart sandbox [here](https://codesandbox.io/s/react-emotion-multi-step-form-basic-example-eqdv7).
## Getting Started

### Peer Dependencies
The following packages are required to be installed as dependencies for using this library:
* react: ^16.8.0
* react-dom": ^16.8.0
* @emotion/core: ^10.0.27
* @emotion/styled: ^10.0.27
* emotion-theming: ^10.0.27

### Installation
```bash
npm install --save react-emotion-multi-step-form
```

## API Reference
https://github.com/ericgio/react-bootstrap-typeahead/blob/master/docs/API.md


### Higher-Order Components & Hooks

### Components

## Examples
Demo the live examples [here](http://z2lai.github.io/react-emotion-multi-step-form), which also include code samples.
You can also demo the following sandbox examples:
* [Quickstart Example](https://codesandbox.io/s/react-emotion-multi-step-form-basic-example-eqdv7)
* [Multi-select Input Example]

## Changelog


## Browser Support

## Caveats
* Relies on SVGR (built-in with react-scripts@^2.0.0) to import SVG icons as components
* Currently only supports one input per page

## Credits
- React Bootstrap Typeahead component by [Eric Giovanola](https://github.com/ericgio/react-bootstrap-typeahead)

## License
MIT © [Zheng Lai](https://github.com/z2lai)
