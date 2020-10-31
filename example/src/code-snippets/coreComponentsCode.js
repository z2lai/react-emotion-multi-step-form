export default `
import React from "react";
import { FormBody, TextInput, withFormContextAndTheme } from "react-emotion-multi-step-form";

const App = () => {
  const handleSubmit = data => {
    console.log(data);
  };

  return (
    <FormBody onSubmit={handleSubmit}>
      <TextInput name="email" />
    </FormBody>
  );
}

export default withFormContextAndTheme(App);
`