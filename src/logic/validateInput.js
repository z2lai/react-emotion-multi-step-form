const validateInput = (inputNode, criteria) => {
    console.log('validateInput called!');
    console.log(inputNode);
    const { name, value } = inputNode; // there is no single node for radio buttons
    console.log(value)
    const {
      required,
      minLength,
      maxLength,
      min,
      max,
      pattern,
      validate
    } = criteria;

    if (required && value === '') return (typeof required === 'string') ? required : `${name} is required!`
    // Other criteria checks
    // ...
    return '';
  }

export default validateInput;