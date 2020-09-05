# React Emotion Multi-step Form

> A multi-step form component library built with React and styled with Emotion

[![NPM](https://img.shields.io/npm/v/react-emotion-multi-step-form.svg)](https://www.npmjs.com/package/react-emotion-multi-step-form)

[//Links to Live Demos, Sandbox, Issues]

## Introduction
An easy to setup form component library where input components are displayed in a multi-step form format (one input per page) with smooth page transitions. It's built with React hooks and React Context API so that the multi-step form logic and values can be reused for UI/UX customization.

[//Add GIF showing full demo app in action]
Demo the live examples [here](http://z2lai.github.io/react-emotion-multi-step-form), which also include code samples.

## Features
* Concise declarative input configuration - icon, page height and input validation
* Smooth page transition animations
* Supports keyboard-only navigation
* Mobile-friendly design
* Supports SVG icons imported as React components (using SVGR that's built-in with Create-React-App)
* Custom Hooks to re-use page change logic
* Context containing shared state for all form field values
* Three Input Components:
 1. Text Input with different types (e.g. text, email, phone, etc.)
 2. Single-select Input - Radio Input with declarative configuration of radio options
 3. Multi-select Input - Multi-select Combobox with Autocomplete and Typeahead (Checkbox or Tag Cloud Format)

## Basic Usage
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

// Import SVG icons as React components using SVGR (built-in with create-react-app)
import { ReactComponent as LinkIcon } from "./icons/link.svg";
import { ReactComponent as TreeIcon } from "./icons/tree.svg";
import { ReactComponent as PriceTagsIcon } from "./icons/price-tags.svg";

function App() {
  const { error } = useActiveIndex(); // grab currentpage input's error message
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
      <div style={{ height: "20px", margin: "0 auto 5px auto", textAlign: "center", color: "red" }}>
        {error.message}
      </div>
    </div>
  );
};

// Wrap component with React Context.Provider and Emotion ThemeProvider
export default withFormContextAndTheme(App);
```
Demo the quickstart sandbox [here](https://codesandbox.io/s/react-emotion-multi-step-form-basic-example-eqdv7).

## Getting Started

### Peer Dependencies
The following packages are required to be installed as dependencies for using this library:
* react: ^16.8.0
* react-dom": ^16.8.0
* react-scripts: ^3.4.0
* @emotion/core: ^10.0.27
* @emotion/styled: ^10.0.27
* emotion-theming: ^10.0.27

### Installation
```bash
npm install --save react-emotion-multi-step-form
```

## API Reference
https://github.com/ericgio/react-bootstrap-typeahead/blob/master/docs/API.md
The components, higher-order components (HOC) and custom hooks described below are publicly exposed in the top-level module.

#### [Components](#components)
- [`<FormBody>`]
- [`<TextInput>`]
- [`<RadioControl>` and `<RadioOption>`]
- [`<CheckboxMulti>`]

#### [HOCs & Hooks](#higher-order-components--hooks-1)
- [`withFormContextAndTheme` HOC]
- [`useActiveIndex` hook]
- [`useInputs` hook]

### `<FormBody>`
The primary component provided by the module which includes the the form body, icon container, input container, forward navigation button and optional Tabs component for additional navigation. The icon container contains the icon of the currently active (displayed) input and the input container contains the currently active input. On click of the forward navigation button, the currently active input is validated and the next input is activated if the validation passes.

**Props**
Name | Type | Default | Description
-----|------|---------|------------
tabs | boolean | `true` | Displays the Tabs component at the top of the form body. If false, alternative way of navigating to previous pages should be provided (see custom Title component).
onSubmit | function | | Invoked when the Submit button on the final page is clicked on. Receives an object where the keys are the input names and the values are the input values.

**Children**

FormBody currently only accepts input components from this module as children.
```jsx
  <FormBody onSubmit={handleSubmit}>
    <TextInput name="firstname" />
    <TextInput name="lastname" />
  </FormBody>
```

### Input Components
This module provides the following custom input components to be used as form inputs within `FormBody`.
* `<TextInput>`
* `<RadioControl>` and `<RadioOption>`
* `<ComboboxMulti>`

These input components all have the following props that allow them to be stored in `FormContext` and displayed properly.

**Common Props**
Name | Type | Default | Description
-----|------|---------|------------
name `required` | string | | HTML name attribute for the input element - must be **unique** within form.
label | string | | Label to be displayed in the Tab component for the input. All labels can also be retrieved from the `useInputs` hook.
icon `required` | elementType | | An SVG file imported as a [React component](https://create-react-app.dev/docs/adding-images-fonts-and-files/#adding-svgs). Refer to [Basic Usage] for an example or see the section below on [importing SVG icons as React components].
height | number | | Specifies the height, in pixels, of the form body when this input is showing. Includes top and bottom padding of 10px and excludes the Tabs component. The default height of the form body is 60px.
onChange | function | | Invoked when controlled input value changes - receives the string value of the input. **Note**: Input value state is managed internally and can be retrieved with the `useInputs` hook.
validationRules | { required: boolean \| string; } | An object containing rules that the input is validated against (in a specific order) on navigation to the next input (e.g. clicking the "next" button). Navigation will be cancelled on the first rule validation failure. The default/custom error message can be retrieved from `useActiveIndex` hook to be displayed on the form. See below for all possible validation rules.

#### Importing SVG icons as React components
Refer to Create React App [Official Docs](https://create-react-app.dev/docs/adding-images-fonts-and-files/#adding-svgs).

#### Validation Rules
Validation rules are passed as an object prop into each input component. The object contains the following key-value pairs where the key is the rule name and the value describes the validation criteria and/or the custom error message.
Rule Name | Value Type | Default | Description
----------|------------|---------|------------
required | boolean \| string | `true` | Specifies whether or not the input is required - default is true. Instead of `true`, a string can be provided to specify a custom error message. The default error message is "The [name] field is required!"

#### `<TextInput>`
The component to be used for text inputs. It has all of the [common props] and the following props.

**Props**
Name | Type | Default | Description
-----|------|---------|------------
placeholder | string | | Placeholder text for the input.

#### `<RadioControl>` and `<RadioOption>`
The component to be used for single-select radio groups. `<RadioControl>` has all of the [common props] and accepts multiple `<RadioOption>` input components as children. The input value will be stored as a string. `<RadioOption>` has the following props.

**Props (`<RadioOption>`)**
Name | Type | Default | Description
-----|------|---------|------------
value | string | | Specifies both the value and the label of the radio option

**Example**
```jsx
  <RadioControl
    name="type"
    label="Type"
    icon={TreeIcon}
    height={100}
    validationRules={{ required: 'Please select a Type!' }}
    onChange={handleTypeChange}
  >
    <RadioOption value="guide" />
    <RadioOption value="tutorial" />
    <RadioOption value="reference" />
    <RadioOption value="video" />
    <RadioOption value="library" />
    <RadioOption value="tool" />
  </RadioControl>
```

#### `<ComboboxMulti>`
The component to be used for multi-select checkboxes - includes many features such as autocomplete/autofilter, typeahead, and tokens. The input value will be stored as an array of strings. It has all of the [common props] and the following props.

**Props**
Name | Type | Default | Description
-----|------|---------|------------
options | [array, array] | | An array containing two arrays where the second array contains groups of checkbox options (represented by arrays) and the first array contains the headings for each of these groups. See examples below.

**Examples**
If the checkboxes cannot be logically separated into multiple groups (i.e. there is only one group), then the array passed into the options prop should follow the same format as the following array:
```jsx
const options = [
  ['colours'],
  ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
]
```

If the checkboxes can be separated into multiple groups, then the array passed into the options prop should follow the same format as the following array:
```jsx
const options = [
  ['fruits', 'vegetables', 'meats'],
  [
    [
      'papaya',
      'kiwi',
      'watermelon',
      'dragon fruit',
    ],
    [
      'brocolli',
      'spinach',
    ],
    [
      'chicken',
      'pork',
      'beef',
    ],
  ]
]
```

### withFormContextAndTheme Higher-order Component (HOC)
This HOC allows the passed in component to have access to the theme and `FormContext` where all internal state is stored. This must be called with the parent component for the form to work.
```jsx
const AppWithContextAndTheme = withFormContextAndTheme(App);
export default AppWithContextAndTheme;
// OR
export default withFormContextAndTheme(App);
```

### useActiveIndex hook
This hook provides access to many state values from `FormContext` related to the input that is currently active (displayed).

**State Values**
Name | Type | Initial Value | Description
-----|------|---------------|------------
activeIndex | number | 0 | An index from 0 to n where n is the number of inputs in the form. The index specifies which input is currently active (displaying on the form). When `activeIndex` = n, the Submit button is displayed and no inputs are active.
changeActiveIndex | function | | Accepts a number that should specify what to change `activeIndex` to (which input to make active). Input validation is performed on the currently active input if the number passed is greater than activeIndex (going forward in the form).
error | { state: boolean, message: string } | { state: false, message: '' } | Error object containing the error state of the form and the error message to display. It's up to the user to place `error.message` somewhere in the form.
isSubmitPage | boolean | false | Specifies if the form is on the last "page" with the Submit button and no inputs are active.

**Example**
```jsx
// Show example with custom Title component
```

### useInputs hook
This hook provides access to `inputValues` which contains all input values.
```jsx
// Show example with rendering value beside title.
```


## Examples
Demo the live examples [here](http://z2lai.github.io/react-emotion-multi-step-form), which also include code samples.
You can also demo the following sandbox examples:
* [Quickstart Example](https://codesandbox.io/s/react-emotion-multi-step-form-basic-example-eqdv7)
* [Multi-select Input Example]

## Feature Roadmap
* More input validation options (e.g. maxLength, min, max, pattern, custom validation function)
* Customizable theme
* More props to customize styling
* More Input Components:
 1. Range Input (Slider)
 2. Toggle/Switch Input
 3. Single-select Input - Single-select Combobox with Autocomplete
* Ability to have multiple inputs on one page with declarative configuration
* Prop-types
* Typescript support
* Test Coverage
* Web Accessibility (WAI-ARIA compliance)

## Browser Support

## Caveats
* Relies on SVGR (built-in with react-scripts@^2.0.0) to import SVG icons as components
* Currently only supports one input per page

## Changelog

## Credits
- React Bootstrap Typeahead component by [Eric Giovanola](https://github.com/ericgio/react-bootstrap-typeahead)

## License
MIT © [Zheng Lai](https://github.com/z2lai)
