export default `
// ...
import { FormBody, Input, withFormContextAndTheme } from "react-emotion-multi-step-form";
import { ReactComponent as LinkIcon } from "../assets/svg/link.svg";
// ...

<FormBody onSubmit={handleSubmit}>
  <Input
    name="email"
    caption="What's your email address?"
    icon={LinkIcon}
    validationRules={{ required: 'Please fill in your email address' }}
  />
</FormBody>
`