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

import { StyledForm, Heading, TitleContainer, ErrorMessage } from "./StyledComponents";
import Title from "./Title";

// import useInputs from '../hooks/useInputs';
// import useActiveIndex from "../hooks/useActiveIndex";
// import withFormContextAndTheme from "./withFormContextAndTheme";
// import FormBody from "./FormBody";
// import TextInput from "./TextInput";
// import { RadioControl, RadioOption } from "./RadioControl";
// import CheckboxMultiControl from "./CheckboxMultiControl";

// If Form is re-rendered a lot, improve performance by memoizing child components that are large like so:
// const MemoizedCheckboxMultiControl = React.memo(CheckboxMultiControl);

const Form = props => {
  console.log('Form rendered!');
  const { inputValues } = useInputs();
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
  //         iconClassName={'icon-link'}
  //         validationRules={{ required: 'Please fill in the URL!' }}
  //         onChange={handleUrlChange}
  //       />
  //       <RadioControl
  //         name="type"
  //         iconClassName={'icon-tree'}
  //         validationRules={{ required: 'Please select a Type!' }}
  //         onChange={handleTypeChange}
  //       >
  //         <RadioOption value="guide" />
  //         <RadioOption value="tutorial" />
  //         <RadioOption value="reference" />
  //       </RadioControl>
  //       <ComboboxMulti
  //         name="tags"
  //         iconClassName={'icon-price-tags'}
  //         validationRules={{ required: 'Please select a Tag!' }}
  //         height={220}
  //         options={tagOptions}
  //         onChange={handleTagsChange}
  //       />
  //     </FormBody>
  //   </StyledForm>
  // );
  return (
    <div style={{ perspective: "800px" }}>
      <div style={{ height: "20px", margin: "0 auto 5px auto", textAlign: "center", color: "red" }}>{error.message}</div>
      <FormBody onSubmit={handleSubmit}>
        <TextInput
          name="fullname"
          placeholder='fullname'
          iconClassName={'icon-link'}
          validationRules={{ required: true }}
        />
        <RadioControl
          name="gender"
          iconClassName={'icon-tree'}
          validationRules={{ required: 'Please select a gender' }}
        >
          <RadioOption value="Male" />
          <RadioOption value="Female" />
          <RadioOption value="Other" />
        </RadioControl>
      </FormBody>
    </div>
  );
}

export default withFormContextAndTheme(Form);