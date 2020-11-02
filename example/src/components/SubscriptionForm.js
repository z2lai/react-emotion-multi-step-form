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
import { ReactComponent as LinkIcon } from "../assets/svg/link.svg";
import { ReactComponent as TreeIcon } from "../assets/svg/tree.svg";
import { ReactComponent as PriceTagsIcon } from "../assets/svg/price-tags.svg";
import options from "../data";

const Form = ({ className }) => {
  const { error, isSubmitPage } = useInputs();
  const rewardRef = useRef();

  const handleSubmit = data => {
    console.log(data);
    rewardRef.current.rewardMe();
  };

  return (
    <div className={className}>
      <Heading>
        Newsletter Subscription
      </Heading>
      <Captions callToActionText="Get the latest news straight to your inbox!" />
      {isSubmitPage ? (<Reward ref={rewardRef} type="confetti"></Reward>) : null}
      <FormBody submitText="Subscribe" submitWidth={130} onSubmit={handleSubmit}>
        <ComboboxMulti
          name="interests"
          caption="What are your interests?"
          icon={PriceTagsIcon}
          height={240}
          validationRules={{ required: 'Please select a Topic' }}
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
          placeholder="example@gmail.com"
          caption="What's your email address?"
          icon={LinkIcon}
          validationRules={{ required: 'Please fill in your email address' }}
        />
      </FormBody>
      <ErrorMessage>{error.message}</ErrorMessage>
    </div>
  );
}

export default withFormContextAndTheme(Form);