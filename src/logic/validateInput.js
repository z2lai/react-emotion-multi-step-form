const REQUIREDMESSAGE = "Please fill in this field."

/**
 * 
 * @param {HTMLElement} input -
 */
export const validateInputHtml5 = input => {
    const { name, value, node, validationRules } = input;
    const {
        required, // boolean or error message string
        minLength, // e.g. 3 or { value: 3, message: 'error message' }
        maxLength, // e.g. 16 or { value: 16, message: 'error message' }
        min, // e.g. 1
        max, // e.g. 100
        pattern, // `regex pattern`
        validate, // { validator: customValidatorFunc, message: customMessageFunc }
    } = validationRules;
    console.log('input to validate:');
    console.log(input);

    if (!node.validity.valid) {
        // node.reportValidity(); // reports the validity status to the user in whatever way the user agent has available
        if (node.validity.valueMissing) return (typeof required === 'string') && required || node.validationMessage;
        if (node.validity.typeMismatch) return node.validationMessage;
        if (node.validity.patternMismatch) return (typeof pattern.message === 'string') && pattern.message || node.validationMessage;
        if (node.validity.tooShort) return (typeof minLength.message === 'string') && minLength.message || node.validationMessage;
        if (node.validity.tooLong) return (typeof maxLength.message === 'string') && maxLength.message || node.validationMessage;
        if (node.validity.min) return (typeof min.message === 'string') && min.message || node.validationMessage;
        if (node.validity.max) return (typeof max.message === 'string') && max.message || node.validationMessage;
    }
    if (validate) return validate(value, name);
    return '';
}

export const validateInputCustom = input => {
    const { name, value, validationRules } = input;
    const { required, validate } = validationRules;
    if (required) {
        const dataType = (Array.isArray(value) && 'array') ||
            ((typeof value === 'object') && 'object') ||
            'primitive';

        switch (dataType) {
            case 'array':
                if (required && value.length === 0) return (typeof required === 'string') ? required : REQUIREDMESSAGE;
                break;
            case 'object':
                break;
            case 'primitive':
                if (required && !value.trim()) return (typeof required === 'string') ? required : REQUIREDMESSAGE;
            default:
                break;
        }
    }

    if (validate) return validate(value, name);
    return '';
}