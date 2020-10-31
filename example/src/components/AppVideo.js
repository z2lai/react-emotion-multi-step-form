import "../appVideo.css";

import React from "react";
import {
  FormBody,
  Captions,
  TextInput,
  RadioControl,
  RadioOption,
  ComboboxMulti,
  withFormContextAndTheme,
  useInputs,
} from "react-emotion-multi-step-form";

import { ReactComponent as LinkIcon } from "../fonts/icomoon/svg/link.svg";
import { ReactComponent as TreeIcon } from "../fonts/icomoon/svg/tree.svg";
import { ReactComponent as PriceTagsIcon } from "../fonts/icomoon/svg/price-tags.svg";
import options from "../data";

const App = () => {
  const { error } = useInputs();

  const handleSubmit = data => {
    console.log(data);
  };

  return (
    <div>
      <h1>
        Newsletter Subscription
      </h1>
      <Captions callToActionText="Get the latest news straight to your inbox!" />
      <FormBody submitText="Subscribe" submitWidth={130} onSubmit={handleSubmit}>
        <ComboboxMulti
          name="interests"
          caption="What are your interests?"
          icon={PriceTagsIcon}
          validationRules={{ required: 'Please select a Topic' }}
          height={240}
          options={options}
        />
        <RadioControl
          name="frequency"
          caption="How often do you want to receive our newsletter?"
          icon={TreeIcon}
          validationRules={{ required: 'Please select a frequency' }}
        >
          <RadioOption value="daily" />
          <RadioOption value="weekly" />
          <RadioOption value="monthly" />
        </RadioControl>
        <TextInput
          name="email"
          caption="What's your email address?"
          icon={LinkIcon}
          validationRules={{ required: 'Please fill in your email address' }}
        />
      </FormBody>
      <div className="error-message">{error.message}</div>
    </div>
  );
}

export default withFormContextAndTheme(App);