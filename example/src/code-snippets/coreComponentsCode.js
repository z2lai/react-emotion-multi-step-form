export default `
import React from "react";
import { FormBody, withFormContextAndTheme } from "react-emotion-multi-step-form";

const App = () => {
  const handleSubmit = data => {
    console.log(data);
  };

  return (
    <FormBody onSubmit={handleSubmit}>
        {/* input components go here */}
    </FormBody>
  );
}

export default withFormContextAndTheme(App);
`