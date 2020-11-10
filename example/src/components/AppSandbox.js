import "../appVideo.css";

import React from "react";
import {
  FormBody,
  withFormContextAndTheme,
  TextInput,
} from "react-emotion-multi-step-form";

import { ReactComponent as LinkIcon } from "../assets/svg/link.svg";
import { ReactComponent as TreeIcon } from "../assets/svg/tree.svg";
import { ReactComponent as PriceTagsIcon } from "../assets/svg/price-tags.svg";
import options from "../data";

const App = () => {

  const handleSubmit = data => {
    console.log(data);
  };

  return (
    <div>
      <h1>
        Newsletter Subscription
      </h1>
      <FormBody submitText="Subscribe" submitWidth={130} onSubmit={handleSubmit}>
        <TextInput 
          name="email" 
          placeholder="example@gmail.com"
          caption="What's your email address?"
          icon={LinkIcon}
          validationRules={{ required: 'Please fill in your email address' }}
        />
      </FormBody>
      <div className="error-message"></div>
    </div>
  );
}

export default withFormContextAndTheme(App);