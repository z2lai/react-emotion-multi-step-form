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

import { StyledForm, Heading, ErrorMessage } from "./StyledComponents";
import { ReactComponent as LinkIcon } from "../fonts/icomoon/svg/link.svg";
import { ReactComponent as TreeIcon } from "../fonts/icomoon/svg/tree.svg";
import { ReactComponent as PriceTagsIcon } from "../fonts/icomoon/svg/price-tags.svg";
import options from "../data";
import InfoCheckbox from "./InfoCheckbox";

const Form = ({ isDrawerOut, setIsDrawerOut }) => {
  const { error, isSubmitPage } = useInputs();
  const rewardRef = useRef();

  const handleSubmit = payload => {
    console.log('Form submitted with the form fields:');
    console.log(payload);
    rewardRef.current.rewardMe();
  };

  return (
    <StyledForm isDrawerOut={isDrawerOut}>
      <Heading>
        Newsletter Subscription
        <InfoCheckbox checked={isDrawerOut} onChange={setIsDrawerOut} />
      </Heading>
      <Captions callToActionCaption="Get the latest news straight to your inbox!" />
      {isSubmitPage ? (<Reward ref={rewardRef} type="confetti"></Reward>) : null}
      <FormBody submitText="Subscribe" submitWidth={130} onSubmit={handleSubmit}>
        <ComboboxMulti
          name="interests"
          label="Interests"
          caption="What are your interests?"
          icon={PriceTagsIcon}
          height={240}
          validationRules={{ required: 'Please select a Topic' }}
          options={options}
        />
        <RadioControl
          name="frequency"
          label="Frequency"
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
          label="Email"
          caption="What's your email address?"
          icon={LinkIcon}
          validationRules={{ required: 'Please fill in your email address' }}
        />
      </FormBody>
      <ErrorMessage>{error.message}</ErrorMessage>
    </StyledForm>
  );
}

export default withFormContextAndTheme(Form);