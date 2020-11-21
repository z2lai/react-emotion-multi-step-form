import "../appVideo.css";

import React from "react";
import {
  useInputs,
  Captions,
  FormBody,
  ComboboxMulti,
  RadioControl,
  RadioOption,
  TextInput,
  withFormContextAndTheme,
} from "react-emotion-multi-step-form";

import { ReactComponent as LinkIcon } from "../assets/svg/link.svg";
import { ReactComponent as TreeIcon } from "../assets/svg/tree.svg";
import { ReactComponent as PriceTagsIcon } from "../assets/svg/price-tags.svg";
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
          validationRules={{ 
            required: true,
            validate: value => value.length >= 3 || 'Please select at least 3 topics.'
          }}
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
          type="email"
          caption="What's your email address?"
          icon={LinkIcon}
          validationRules={{ 
            required: true,
            maxLength: 5,
            validate: value => value === '123@5' || 'Value is not equal to 123@5!'
          }}
        />
      </FormBody>
      <div className="error-message">{error.message}</div>
    </div>
  );
}

export default withFormContextAndTheme(App);