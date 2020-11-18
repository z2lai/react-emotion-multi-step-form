<div align="center">
  <h1>React Emotion Multi-step Form</h1>

  > A multi-step form component library built with React and styled with Emotion

  [![NPM](https://img.shields.io/npm/v/react-emotion-multi-step-form.svg)](https://www.npmjs.com/package/react-emotion-multi-step-form)

  ![Example App Demo](example/src/example-app-demo-final.gif)
</div>

## Introduction
A declarative component library where input components are displayed in a multi-step form format with smooth page transitions. It's built with React hooks and React Context API so that form state and input prop values can be reused for UI customization.

Demo the example app [here](http://z2lai.github.io/react-emotion-multi-step-form#example-app) or learn how to get started [here](http://z2lai.github.io/react-emotion-multi-step-form#getting-started).

## Features
* Declarative display configuration - captions, page height, input icon and input validation
* Smooth/Optimized page transition animations
* Accessible keyboard-only navigation
* Responsive design
* Custom hook to access form state and input prop values for UI customization
* Supports SVG icons imported as React components (using SVGR that's built-in with Create-React-App)
* Three Input Components:
  1. Text Input with HTML5 form validation
  2. Single-select Input - Radio Input with declarative configuration of radio options
  3. Multi-select Input - Multi-select Combobox with Autocomplete and Typeahead

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

### Basic Usage
```jsx
import React from "react";
import {
  useInputs,
  FormBody,
  TextInput,
  RadioControl,
  RadioOption,
  withFormContextAndTheme,
} from "react-emotion-multi-step-form";

// Import SVG icons as React components using SVGR (built-in with create-react-app)
import { ReactComponent as LinkIcon } from "./assets/link.svg";
import { ReactComponent as TreeIcon } from "./assets/tree.svg";
import { ReactComponent as PriceTagsIcon } from "./assets/price-tags.svg";

function App() {
  const { error } = useInputs(); // grab the active input's error message
  const handleSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <FormBody onSubmit={handleSubmit}>
        <TextInput
          name="firstname" // name of each input component must be unique
          icon={LinkIcon} // icon to be displayed beside input component
          validationRules={{ required: true }}
        />
        <TextInput
          name="lastname"
          icon={TreeIcon}
          validationRules={{ required: true }} // default error message
        />
        <RadioControl
          name="age"
          icon={PriceTagsIcon}
          validationRules={{ required: "Please select an age group" }} // custom error message
        >
          <RadioOption value="<15" />
          <RadioOption value="15-64" />
          <RadioOption value="≥65" />
        </RadioControl>
      </FormBody>
      <div style={{ textAlign: "center", color: "red" }}>{error.message}</div>
    </div>
  );
}

// Wrap component with React Context.Provider and Emotion ThemeProvider
export default withFormContextAndTheme(App);
```
[CodeSandbox](https://codesandbox.io/s/react-emotion-multi-step-form-basic-example-v081-mhibp)

### All Examples
Demo the following CodeSandbox examples:
* [Basic Usage Example](https://codesandbox.io/s/react-emotion-multi-step-form-v09-basic-example-mhibp)
* ["Subscription Form" Example](https://codesandbox.io/s/react-emotion-multi-step-form-v09-subscription-form-h6mpc)

## API Reference
The components and custom hook described below are publicly exposed in the top-level module.

**Components**
- [`<FormBody>`](https://github.com/z2lai/react-emotion-multi-step-form#formbody)
- [Input Components](https://github.com/z2lai/react-emotion-multi-step-form#input-components)
  1. [`<TextInput>`](https://github.com/z2lai/react-emotion-multi-step-form#textinput)
  2. [`<RadioControl>` and `<RadioOption>`](https://github.com/z2lai/react-emotion-multi-step-form#radiocontrol-and-radiooption)
  3. [`<ComboBoxMulti>`](https://github.com/z2lai/react-emotion-multi-step-form#comboboxmulti)
- [`<Captions>`](https://github.com/z2lai/react-emotion-multi-step-form#captions)

**HOCs & Hooks**
- [`withFormContextAndTheme` HOC](https://github.com/z2lai/react-emotion-multi-step-form#withformcontextandtheme-hoc)
- [`useInputs` hook](https://github.com/z2lai/react-emotion-multi-step-form#useinputs-hook)

### `<FormBody>`
The main component provided by the module which includes the body of the form, icon container, input container, navigation buttons, Tabs component and the Submit button. The icon container contains the icon of the currently active (displayed) input and the input container contains the active input (only one input can be active at a time). On click of the Next button, the active input is validated and the next input is made active if validation passes. The Submit button appears after the last input has been validated.

**Props**
Name | Type | Default | Description
-----|------|---------|------------
initialFocus | boolean | true | Specifies if the form (first input) should be focused on initial render
onSubmit | function | | Invoked when the Submit button on the final page is clicked on. Receives an object where the keys are the input names and the values are the input values.
submitText | string | 'Submit' | Text displayed on the Submit button
submitWidth | number | 110 | Width in pixels of the Submit button

**Children**

FormBody currently only accepts input components from this module as children. These input components will be contained within the input container and be displayed one at a time depending on which input is active.
```jsx
  <FormBody onSubmit={handleSubmit}>
    <TextInput name="firstname" />
    <TextInput name="lastname" />
  </FormBody>
```

### Input Components
This module provides the following custom input components to be used as form inputs within `FormBody`.
1. [`<TextInput>`](https://github.com/z2lai/react-emotion-multi-step-form#textinput)
2. [`<RadioControl>` and `<RadioOption>`](https://github.com/z2lai/react-emotion-multi-step-form#radiocontrol-and-radiooption)
3. [`<ComboBoxMulti>`](https://github.com/z2lai/react-emotion-multi-step-form#comboboxmulti)

These input components all share the following props in common which allows them to be registered in `FormContext` and displayed appropriately.

#### **Base Props**
Name | Type | Default | Description
-----|------|---------|------------
name `required` | string | | HTML name attribute for inputs - must be **unique** within form.
onChange | function | | Invoked when controlled input value changes - receives the string value of the input. **Note**: Input value state is managed internally and can be retrieved with the `useInputs` hook.
caption | string | | Caption to be displayed in the `<Captions>` custom component when this input is active.
icon | elementType | | An SVG file imported as a [React component](https://create-react-app.dev/docs/adding-images-fonts-and-files/#adding-svgs). Refer to [Basic Usage] for an example or see the section below on [importing SVG icons as React components].
height | number | 60 | Specifies the height, in pixels, of the form body when this input is active. Includes top and bottom padding of 10px and excludes the Tabs component.
validationRules | { required: boolean \| string; } | | An object containing rules that the input is validated against (in a specific order) on navigation to the next input (e.g. clicking the Next button). Navigation will be cancelled on the first rule validation failure. The default/custom error message can be retrieved from `useInputs` hook to be displayed on the form. See below for all possible validation rules.

#### Importing SVG icons as React components
Refer to Create React App [Official Docs](https://create-react-app.dev/docs/adding-images-fonts-and-files/#adding-svgs).

#### Validation Rules
Validation rules are passed as an object prop into each input component. The object contains the following key-value pairs where the key is the rule name and the value describes the validation criteria and/or the custom error message.
Key | Value Type | Default | Description
----------|------------|---------|------------
required | boolean \| string | `true` | Specifies whether or not the input is required - default is true. Instead of `true`, a custom error message can be provided (as a string) to replace the default error message, "The [name] field is required!"

#### `<TextInput>`
The component to be used for text inputs. It accepts the [base props](https://github.com/z2lai/react-emotion-multi-step-form#base-props) and the following props:

**Props**
Name | Type | Default | Description
-----|------|---------|------------
placeholder | string | | Placeholder text for text inputs

#### `<RadioControl>` and `<RadioOption>`
The component to be used for radio inputs (single-select). `<RadioControl>` accepts the [base props](https://github.com/z2lai/react-emotion-multi-step-form#base-props) and accepts multiple `<RadioOption>` input components as children.

`<RadioOption>` accepts the following props:

**Props (`<RadioOption>`)**
Name | Type | Default | Description
-----|------|---------|------------
value `required` | string \| number | | Value of the radio option
label | string | | Label text of radio option - displays `value` if not defined.

**Example**
```jsx
  <RadioControl
    name="frequency"
    caption="How often do you want to receive our newsletter?"
    icon={TreeIcon}
    validationRules={{ required: 'Please select a frequency' }}
  >
    <RadioOption value="daily" />
    <RadioOption value="weekly" />
    <RadioOption value="monthly" />
  </RadioControl>
```

#### `<ComboboxMulti>`
The component to be used for checkbox inputs (multi-select). It includes many features such as autocomplete/autofilter, typeahead, and tokens. The selected options will be stored as an array of strings. `<ComboboxMulti>` accepts the [base props](https://github.com/z2lai/react-emotion-multi-step-form#base-props) and the following props:

**Props**
Name | Type | Default | Description
-----|------|---------|------------
options | [array, array] | | An array of two arrays containing equal number of elements. The second array contains groups of checkbox options (represented by arrays of strings) and the first array contains the headings for each of these groups. See examples below.

**Examples**
If the checkbox options can be logically separated into multiple groups, then the array passed into the options prop should be in the following format:
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

Otherwise, the array passed into the options prop should be in the following format:
```jsx
const options = [
  ['colours'],
  [
    ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
  ]
]
```

### `<Captions>`
This component uses the [`useInputs` hook](https://github.com/z2lai/react-emotion-multi-step-form#useinputs-hook) to display the caption of the currently active input. It accepts the following props:

**Props**
Name | Type | Default | Description
-----|------|---------|------------
callToActionText `required` | string | | Call-to-action text to be displayed on the final page with the Submit button.

### withFormContextAndTheme HOC
This higher-order component (HOC) provides the wrapped component with access to the theme and `FormContext` which stores the form state. This HOC must be called with the parent component as follows:
```jsx
const AppWithContextAndTheme = withFormContextAndTheme(App);
export default AppWithContextAndTheme;
```

Or simply:
```jsx
export default withFormContextAndTheme(App);
```

### useInputs Hook
This custom hook returns the following form state values from `FormContext`:

**Returned Values**
Name | Type | Initial Value | Description
-----|------|---------------|------------
inputs | Array\<Object\> | `[]` | An array of objects where each object contains the prop values of each input. Each input object contains the following prop-value pairs which were passed as props into each input: `caption`, `icon` and `height`.<br>**Note**: On initial form render, `inputs` is always empty as all input components still need to be rendered once for their ref callbacks to "register" them in inputs (which triggers an immediate re-render).
activeIndex | number | `0` | An index from 0 to n where n is the number of inputs in the form. The index specifies which input is currently active (`0` refers to the first input and n refers to the Submit button which comes after the last input).
changeActiveIndex | function | | Accepts a number that should specify what to change `activeIndex` to (which input to make active). Input validation is performed on the currently active input only if the number passed is greater than activeIndex (going forward in the form).
activeInput | object | | An object from `inputs` that represents the input that is currently active. activeInput is `null` when activeIndex = n.
error | { state: boolean, message: string } | `{ state: false, message: '' }` | Error object containing the error state of the form and the error message to display. `error.message` should be added to the form as it's not displayed by default.
isSubmitPage | boolean | false | Specifies if the form is on the last "page" with the Submit button.
inputValues | object | `{}` | An object containing all form values where each key is the input name and each value is the input value. This gets updated every time `changeActiveIndex` is called (e.g. clicking the Next button).

**Example**
These values and functions can be used, as follows, to create a custom component for navigating backwards to previous inputs in the form:
```jsx
// All custom components not defined here are just styled components (Emotion) that only contain styling

// Labels component
const Labels = () => {
  const { inputs, activeIndex, changeActiveIndex, inputValues } = useInputs();

  return (
    <LabelsContainer>
      {(inputs.length > 0) ? // render null on initial form render
        inputs.map((input, index) => (
          <Label
            key={`${index}${input.name}`}
            inputValue={inputValues[input.name]}
            active={index === activeIndex}
            changeActiveIndex={() => changeActiveIndex(index)}
            activated={index < activeIndex}
          />
        ))
        : null
      }
    </LabelsContainer>
  )
}

// Label component
const Label = ({ 
  label, 
  inputValue, 
  active, 
  changeActiveIndex, 
  activated 
}) => {
  const handleClick = event => {
    if (!activated) return;
    changeActiveIndex();
  }

  return (
    <StyledLabel
      active={active} // for styling
      activated={activated} // for styling
      onClick={handleClick}
    >
      {inputValue || label}
    </StyledLabel>
  )
}
```

## Feature Roadmap
* Test Coverage
* Web Accessibility (WAI-ARIA compliance)
* More input validation options (e.g. custom validation function)
* Customizable theme/more props to customize styling
* More input components:
 1. Range Input (Slider)
 2. Toggle/Switch Input
 3. Multi-select Input - Tag Cloud Format
* Ability to have multiple inputs on one page with declarative configuration
* Typescript support

## Browser Support
Recent versions of the following browsers are supported:
- Chrome

## Changelog

## Credits
- [React Bootstrap Typeahead](https://github.com/ericgio/react-bootstrap-typeahead) component by Eric Giovanola
- [react-rewards](https://github.com/thedevelobear/react-rewards) (confetti) component by Develobear (not included in library)

## License
[MIT](https://github.com/z2lai/react-emotion-multi-step-form/blob/master/LICENSE.md) © [Zheng Lai](https://github.com/z2lai)