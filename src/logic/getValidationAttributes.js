const getValidationAttributes = validationRules => {
    const validationAttributes = {};

    for (const [rule, value] of Object.entries(validationRules)) {
        switch (rule) {
            case 'required':
                validationAttributes[rule] = typeof value === 'string' || value;
                break;
            case 'minLength', 'maxLength', 'min', 'max', 'pattern':
                validationAttributes[rule] = typeof value === 'object' && value.value || value;
                break;
            default:
                break;
        }
    }

    return validationAttributes;
}

export default getValidationAttributes;