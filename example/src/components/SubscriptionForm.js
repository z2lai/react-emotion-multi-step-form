import React, { useRef } from "react";
import {
  useInputs,
  withFormContextAndTheme,
  FormBody,
  Captions,
  TextInput,
  RadioControl,
  RadioOption,
  ComboboxMulti
} from "react-emotion-multi-step-form";
import Reward from 'react-rewards';

import { Heading, ErrorMessage } from "./StyledComponents";
import { ReactComponent as LinkIcon } from "../fonts/icomoon/svg/link.svg";
import { ReactComponent as TreeIcon } from "../fonts/icomoon/svg/tree.svg";
import { ReactComponent as PriceTagsIcon } from "../fonts/icomoon/svg/price-tags.svg";
import options from "../data";

const Form = props => {
  const { error, isSubmitPage } = useInputs();
  const rewardRef = useRef();

  const handleUrlChange = url => console.log(`handleUrlChange called with: ${url}`);
  const handleTypeChange = type => console.log(`handleType called with: ${type}`);
  const handleTagsChange = tags => console.log(`handleTags called with: ${tags}`);
  const handleSubmit = payload => {
    console.log('Form submitted with the form fields:');
    console.log(payload);
    rewardRef.current.rewardMe();
  };

  return (
    <div>
      <Heading>Newsletter Subscription</Heading>
      <Captions callToActionCaption="Get the latest news straight to your inbox!" />
      {isSubmitPage ? (<Reward ref={rewardRef} type="confetti"></Reward>) : null}
      <FormBody submitText="Subscribe" submitWidth={130} onSubmit={handleSubmit}>
        <TextInput
          name="firstname"
          placeholder="John"
          label="Firstname"
          caption="What's your name?"
          icon={LinkIcon}
          validationRules={{ required: 'Please fill in your firstname' }}
          onChange={handleUrlChange}
        />
        <ComboboxMulti
          name="interests"
          label="Interests"
          caption="What are your interests?"
          icon={PriceTagsIcon}
          height={240}
          validationRules={{ required: 'Please select a Topic' }}
          options={options}
          onChange={handleTagsChange}
        />
        <RadioControl
          name="frequency"
          label="Frequency"
          caption="How often do you want to receive our newsletter?"
          icon={TreeIcon}
          validationRules={{ required: 'Please select a frequency' }}
          onChange={handleTypeChange}
        >
          <RadioOption value="daily" />
          <RadioOption value="weekly" />
          <RadioOption value="monthly" />
        </RadioControl>
      </FormBody>
      <ErrorMessage>{error.message}</ErrorMessage>
    </div>
  );
}

export default withFormContextAndTheme(Form);