This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Refactor Form Component

### Requirements
- Need to have each input component registered on render
- For each input registered, create an object in a global array containing the following:
    1. Icon class name for the icon that goes beside the input
    2. Validation criteria that gets checked when NextButton is clicked
    3. Input node ref to focus when input validation returns an error
- For managing which input is active, manage a global state for:
    1. activeInputName that stores the name of the input that is active
    2. activeIndex that stores the index of the active input
    3. changeActiveIndex that changes activeIndex and does validation is going to next input
    - If changeActiveIndex triggers, change activeInputName by getting the input.node.name of the input at inputs.current[activeIndex]
    - All inputs should have an effect that contains activeInputName as a dependency, and sets active state to true if name of input (passed through props)
        matches activeInputName

### Todo
1. Create a Context and a function component that returns the Context.Provider wrapper and stores the following shared state:
    - Array of input Objects
    - activeIndex
    - activeInputName
    - changeActiveIndex
2. Render icons and active icon based on inputs and activeIndex
3. Implement activeIndex management with input validation
4. Once input is validated, return input value with a handler

## Publish to NPM as React Component Library
Use react-modern-library-boilerplate repo to publish library: https://github.com/transitive-bullshit/react-modern-library-boilerplate