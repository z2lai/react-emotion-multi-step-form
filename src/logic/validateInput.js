const validateInput = (name, value, criteria) => {
    console.log('validateInput called with name and value:');
    console.log(name);
    console.log(value);
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