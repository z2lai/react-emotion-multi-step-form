import React, { useState } from "react";
import {
  useInputs,
  useActiveIndex,
  withFormContextAndTheme,
  FormBody,
  TextInput,
  RadioControl,
  RadioOption,
  ComboboxMulti
} from "react-emotion-multi-step-form";

import { ReactComponent as LinkIcon } from "../fonts/icomoon/svg/link.svg";
import { ReactComponent as TreeIcon } from "../fonts/icomoon/svg/tree.svg";
import { ReactComponent as PriceTagsIcon } from "../fonts/icomoon/svg/price-tags.svg";

import { StyledForm, Heading, TitleContainer, ErrorMessage } from "./StyledComponents";
import Title from "./Title";

// If Form is re-rendered a lot, improve performance by memoizing child components that are large like so:
// const MemoizedCheckboxMultiControl = React.memo(CheckboxMultiControl);

const Form = props => {
  console.log('Form rendered!');
  const { inputs, inputValues } = useInputs();
  const { activeIndex, changeActiveIndex, error } = useActiveIndex();
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

  const handleUrlChange = url => console.log(`handleUrlChange called with: ${url}`);
  const handleTypeChange = type => console.log(`handleType called with: ${type}`);
  const handleTagsChange = tags => console.log(`handleTags called with: ${tags}`);
  const handleSubmit = payload => {
    console.log('Form submitted with the form fields:');
    console.log(payload);
  };

  // return (
  //   <StyledForm>
  //     <Heading>Submit An Article To the Communal Curator</Heading>
  //     <TitleContainer>
  //       <Title
  //         value={inputValues['url'] || 'Input Article URL'}
  //         page={0}
  //         active={activeIndex === 0}
  //         changeActivePage={changeActiveIndex}
  //       />
  //       <Title
  //         value={inputValues['type'] || 'Select Resource Type'}
  //         page={1}
  //         active={activeIndex === 1}
  //         changeActivePage={changeActiveIndex}
  //       />
  //       <Title
  //         value={((inputValues['tags'] && inputValues['tags'].length) && inputValues['tags'].join(', ')) || 'Select Article Tags'}
  //         page={2}
  //         active={activeIndex === 2}
  //         changeActivePage={changeActiveIndex}
  //       />
  //     </TitleContainer>
  //     <ErrorMessage>{error.message}</ErrorMessage>
  //     <FormBody onSubmit={handleSubmit}>
  //       <TextInput
  //         name="url"
  //         placeholder='url'
  //         icon={LinkIcon}
  //         validationRules={{ required: 'Please fill in the URL!' }}
  //         onChange={handleUrlChange}
  //       />
  //       <RadioControl
  //         name="type"
  //         icon={TreeIcon}
  //         validationRules={{ required: 'Please select a Type!' }}
  //         onChange={handleTypeChange}
  //       >
  //         <RadioOption value="guide" />
  //         <RadioOption value="tutorial" />
  //         <RadioOption value="reference" />
  //       </RadioControl>
  //       <ComboboxMulti
  //         name="tags"
  //         icon={PriceTagsIcon}
  //         validationRules={{ required: 'Please select a Tag!' }}
  //         height={220}
  //         options={tagOptions}
  //         onChange={handleTagsChange}
  //       />
  //     </FormBody>
  //   </StyledForm>
  // );
  return (
    <div>
      <FormBody onSubmit={handleSubmit}>
        <TextInput
          name="fullname"
          placeholder="fullname"
          label={"Fullname"}
          icon={LinkIcon}
          validationRules={{ required: true }}
        />
        <RadioControl
          name="gender"
          label="Gender"
          icon={TreeIcon}
          validationRules={{ required: 'Please select a gender' }}
        >
          <RadioOption value="Male" />
          <RadioOption value="Female" />
          <RadioOption value="Other" />
        </RadioControl>
        <TextInput
          name="age"
          placeholder="age"
          label={"Age"}
          icon={PriceTagsIcon}
          validationRules={{ required: true }}
        />
      </FormBody>
      <div style={{ height: "20px", margin: "0 auto 5px auto", textAlign: "center", color: "red" }}>{error.message}</div>
    </div>
  );
}

export default withFormContextAndTheme(Form);