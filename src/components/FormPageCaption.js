import React from "react";

const FormPageCaption = props => {
  return (
  <h1>
    {props.page === 1 ? 'Enter your article URL:' :
    props.page === 2 ? 'Select your article type:' :
    'Tag your article with the appropriate topics:' }
  </h1>
  )
};

export default FormPageCaption;
