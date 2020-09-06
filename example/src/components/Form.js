import React, { useState, useRef } from "react";
import {
  useInputs,
  withFormContextAndTheme,
  FormBody,
  Labels,
  TextInput,
  RadioControl,
  RadioOption,
  ComboboxMulti
} from "react-emotion-multi-step-form";
import Reward from 'react-rewards';

import { ReactComponent as LinkIcon } from "../fonts/icomoon/svg/link.svg";
import { ReactComponent as TreeIcon } from "../fonts/icomoon/svg/tree.svg";
import { ReactComponent as PriceTagsIcon } from "../fonts/icomoon/svg/price-tags.svg";

import { Heading, TitleContainer, ErrorMessage } from "./StyledComponents";
// import Title from "./Title";

// If Form is re-rendered a lot, improve performance by memoizing child components that are large like so:
// const MemoizedCheckboxMultiControl = React.memo(CheckboxMultiControl);

const Form = props => {
  console.log('Form rendered!');
  const { error, isSubmitPage } = useInputs();
  const [tagOptions, setTagOptions] = useState([ // fetch data in useEffect hook to update this state after initial render
    ['suggestions', 'parent categories', 'syntax', 'fundamentals'],
    [
      [
        'object',
        'scope',
        'execution context',
        'closures',
        'nodejs',
        'es6',
        'express',
      ],
      [
        'asynchronous',
        'execution context',
        'syntax',
        'context',
        'fundamentals',
        'object',
        'object oriented programming',
        'ES6',
        'web browser',
        'developer tools',
        'best practice',
      ],
      [
        'operators',
        'control flow',
        'data types',
        'express',
        'nodejs',
      ],
      [
        'scope',
        'error handling',
        'asynchronous',
        'closures',
      ],
    ]
  ]);
  const rewardRef = useRef();

  const handleUrlChange = url => console.log(`handleUrlChange called with: ${url}`);
  const handleTypeChange = type => console.log(`handleType called with: ${type}`);
  const handleTagsChange = tags => console.log(`handleTags called with: ${tags}`);
  const handleSubmit = payload => {
    console.log('Form submitted with the form fields:');
    console.log(payload);
    console.log(rewardRef);
    rewardRef.current.rewardMe();
  };

  return (
    <div>
      <Heading>Submit An Article To the Communal Curator</Heading>
      {/* <TitleContainer>
        <Title
          value={inputValues['url'] || 'Input Article URL'}
          page={0}
          active={activeIndex === 0}
          changeActivePage={changeActiveIndex}
        />
        <Title
          value={inputValues['type'] || 'Select Resource Type'}
          page={1}
          active={activeIndex === 1}
          changeActivePage={changeActiveIndex}
        />
        <Title
          value={((inputValues['tags'] && inputValues['tags'].length) && inputValues['tags'].join(', ')) || 'Select Article Tags'}
          page={2}
          active={activeIndex === 2}
          changeActivePage={changeActiveIndex}
        />
      </TitleContainer> */}
      <Labels />
      {isSubmitPage ? (<Reward ref={rewardRef} type="confetti"></Reward>) : null}
      <FormBody onSubmit={handleSubmit}>
        <RadioControl
          name="type"
          label="Type"
          icon={TreeIcon}
          height={100}
          validationRules={{ required: 'Please select a Type!' }}
          onChange={handleTypeChange}
        >
          <RadioOption value="guide" />
          <RadioOption value="tutorial" />
          <RadioOption value="reference" />
          <RadioOption value="video" />
          <RadioOption value="library" />
          <RadioOption value="tool" />
        </RadioControl>
        <TextInput
          name="url"
          placeholder="url"
          label="Url"
          icon={LinkIcon}
          validationRules={{ required: 'Please fill in the URL!' }}
          onChange={handleUrlChange}
        />
        <ComboboxMulti
          name="tags"
          label="Tags"
          icon={PriceTagsIcon}
          height={240}
          validationRules={{ required: 'Please select a Tag!' }}
          options={tagOptions}
          onChange={handleTagsChange}
        />
      </FormBody>
      <ErrorMessage>{error.message}</ErrorMessage>
    </div>
  );
}

export default withFormContextAndTheme(Form);