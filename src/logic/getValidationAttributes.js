/**
 * Retrieves all HTML5 validation attributes
 * @param {object} validationRules - an object of key value pairs where the
 *   key could be a HTML5 validation attribute (e.g. maxLength) and the value could be either:
 *   1. the criteria value (e.g. 5) OR
 *   2. an object containing two properties: value and message 
 *   (e.g. { value: 5, message: "Text contains too many characters!" })
 * Returns an object of HTML5 validation rules (e.g. { required: true, maxLength: 5 })
 */
const getValidationAttributes = validationRules => {
  const validationAttributes = {};

  for (const [rule, value] of Object.entries(validationRules)) {
    switch (rule) {
      case 'required':
        validationAttributes[rule] = typeof value === 'string' || value;
        break;
      case 'minLength':
      case 'maxLength':
      case 'min':
      case 'max':
      case 'pattern':
        validationAttributes[rule] = typeof value === 'object' && value.value || value;
        break;
      default:
        break;
    }
  }

  return validationAttributes;
}

export default getValidationAttributes;