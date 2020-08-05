# React Emotion Multi-step Form

> A multi-step form component library built with React and styled with Emotion

[![NPM](https://img.shields.io/npm/v/react-emotion-multi-step-form.svg)](https://www.npmjs.com/package/react-emotion-multi-step-form)

[//Links to Live Demos, Sandbox, Issues]

## Introduction
An easy to setup form component library where input components are displayed in a multi-step form format with smooth page transitions. It's built with React hooks and React Context API so that the multi-step form logic and values can be reused for further customization of the UI/UX.

## Features
[//Add GIF showing basic app in action]

### Current Features
* Declarative configuration of icons, page heights and input validation for each input
* Ability to add custom input validation function
* Smooth Page transitions - icon and height animations
* Supports keyboard-only navigation
* Custom Hooks to re-use page change logic
* Global Context containing form field values
* Customizable Theme
* Three Input Components:
 1. Text Input with different types (e.g. text, email, phone, etc.)
 2. Single-select Input - Radio Input with declarative configuration of radio options
 3. Multi-select Input - Multi-select Combobox with Autocomplete and Typeahead (Checkbox or Tag Cloud Format)

### Feature Roadmap
* More Input Components:
 1. Range Input (Slider)
 2. Toggle/Switch Input
 3. Single-select Input - Single-select Combobox with Autocomplete
* Ability to have multiple inputs on one page with declarative configuration
* Test Coverage
* Typescript support

## Basic Usage

```jsx
import React, { Component } from 'react'

import MyComponent from 'react-modern-library-component'

class Example extends Component {
  render () {
    return (
      <MyComponent />
    )
  }
}
```

## Getting Started

### Peer Dependencies

### Installation

```bash
npm install --save react-emotion-multi-step-form
```

## API Reference
https://github.com/ericgio/react-bootstrap-typeahead/blob/master/docs/API.md

### Components

### Hooks and Higher-order Components

## Browser Support

## Caveats
* Only supports one input per page

## Credits
https://github.com/ericgio/react-bootstrap-typeahead/
 Multi-page Form Design Inspiration: [//link to codepen]

## License

MIT © [Zheng Lai](https://github.com/z2lai)
