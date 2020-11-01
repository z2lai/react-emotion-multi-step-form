export default `
// ...
import { FormBody, TextInput, withFormContextAndTheme } from "react-emotion-multi-step-form";
// ...

<FormBody onSubmit={handleSubmit}>
  <TextInput
    name="email"
    caption="What's your email address?"
    icon={LinkIcon}
    validationRules={{ required: 'Please fill in your email address' }}
  />
</FormBody>
`