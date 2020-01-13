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

const urlInput = (
  <input name="URL" option="text" placeholder="Article URL" onChange={props.handleChange} value={props.state.Url} />
)

export default FormPageCaption;