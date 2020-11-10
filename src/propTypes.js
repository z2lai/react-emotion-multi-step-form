import PropTypes from 'prop-types';

const inputPropTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    label: PropTypes.string,
    caption: PropTypes.string,
    icon: PropTypes.elementType,
    height: PropTypes.number,
    validationRules: PropTypes.object,
}

export default inputPropTypes;