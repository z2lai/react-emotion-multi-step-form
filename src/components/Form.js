import React, { useState, useRef, useCallback, useEffect, useContext } from "react";

import useInputs from '../hooks/useInputs';
import {
  StyledForm, Heading, TitleContainer, ErrorMessage, IconContainer, IconWrapper, InputContainer,
  SubmitLabel, NextButton, NextButtonIcon
} from "./StyledComponents";
import Title from "./Title";
import FormBody from "./FormBody";
import TextInput from "./TextInput";
import { RadioControl, RadioOption } from "./RadioControl";
import CheckboxControl from "./CheckboxControl";

import useActiveIndex from "../hooks/useActiveIndex";
import useError from '../hooks/useError';
import { InputsContext } from '../context/InputsContext';

import log from "../tests/log";

// const MemoizedTitle = React.memo(Title);
const MemoizedCheckboxControl = React.memo(CheckboxControl);

const Form = props => {
  console.log('Form rendered!');
  const { registerInput, inputValues } = useInputs();
  const { activeIndex, changeActiveIndex, error } = useActiveIndex();
  // const error = useError()[0];
  // const inputsRef = useRef();
  // const factors = ["Beginner Friendly", "Deep Dive", "Comphrensive"]; // should be queried from database

  const [isScraped, setIsScraped] = useState(false);
  const [article, setArticle] = useState({
    url: '',
    type: '',
    tags: [],
    title: ''
  });
  const [url, setUrl] = useState(''); // url has to be separated from article object as we don't want all components that use article for props to re-render whenever we update article state with a new url through the input onChange event handler
  const [type, setType] = useState('');
  const [tags, setTags] = useState([]);
  const [tagOptions, setTagOptions] = useState({
    groupHeadings: ['suggestions', 'parent categories', 'syntax', 'fundamentals'], // need to move this out of state as it never changes
    groups: [
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
  });

  // const [error, setError] = useState({
  //   state: false,
  //   message: ''
  // })

  const formRef = useRef();
  const formBodyRef = useRef();
  const urlInputRef = useRef();
  const tagInputRef = useRef();
  const buttonRef = useRef();

  // setFormState = stateIndex => this.setState({ formState: this.formStates[stateIndex] });

  // updateState = (stateProperty, stateValue) => this.setState({ [stateProperty]: stateValue });

  // handleSubmit = event => {
  //   const tagOptions = this.state.tagOptions;
  //   const topics = Object.keys(tagOptions).filter(topic => tagOptions[topic]);
  //   console.log(topics);
  //   const body = {
  //     _id: this.state.url,
  //     title: this.state.article.title,
  //     topics
  //   };
  //   fetch("/articles/add", {
  //     method: "post",
  //     body: JSON.stringify(body),
  //     headers: { "Content-Type": "application/json" }
  //   })
  //     // .then(response => response.json())
  //     .then(result => console.log(result));
  // };

  const handleUrlChange = url => {
    console.log(`handleUrlChange called with: ${url}`);
  }

  const memoizedhandleTypeChange = useCallback(
    type => {
      console.log(`handleType called with: ${type}`);
    },
    []
  );

  // Combine this function with the function above?
  const memoizedhandleTagChange = useCallback(
    tags => {
      console.log(`handleType called with: ${tags}`);
    },
    []
  );

  const submit = () => {
    console.log('Article submitted!');
  };

  // const setErrorMessage = message => {
  //   if (message) {
  //     setError({ state: true, message });
  //   } else {
  //     setError({ state: false, message: '' });
  //   }
  // }

  // const changeActivePage = newActivePage => {
  //   const isNextPage = newActivePage > activePage;
  //   /* 
  //     1. Focus Input or FormBody
  //     2. setErrorMessage 
  //   */
  //   if (isNextPage) {
  //     const input = inputsRef.current[activePage - 1];
  //     const error = input.validate(); // returns error message
  //     console.log(error);
  //     if (error) {
  //       input.node.focus();
  //       return setErrorMessage(error);
  //     }
  //   }

  // switch (activePage) {
  //   case 1:
  //     if (isNextPage && url === '') {
  //       urlInputRef.current.focus();
  //       return setErrorMessage('Please fill in the URL!');
  //     }
  //     setArticle({ ...article, url });
  //     break;
  //   case 2:
  //     if (isNextPage && type === '') {
  //       formBodyRef.current.focus();
  //       return setErrorMessage('Please select a Type!');
  //     }
  //     setArticle({ ...article, type });
  //     break;
  //   case 3:
  //     if (isNextPage && tags.length === 0) {
  //       tagInputRef.current.focus();
  //       return setErrorMessage('Please select a Tag!');
  //     }
  //     setArticle({ ...article, tags });
  //     break;
  // }
  // setErrorMessage('');
  //   setActivePage(newActivePage);
  //   formBodyRef.current.focus();
  // }

  return (
    <StyledForm ref={formRef} tabIndex={-1}>
      <Heading>Submit An Article To the Communal Curator</Heading>
      <TitleContainer>
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
          value={(inputValues['tags'] && inputValues['tags'].length) && inputValues['tags'].join(', ') || 'Select Article Tags'}
          page={2}
          active={activeIndex === 2}
          changeActivePage={changeActiveIndex}
        />
      </TitleContainer>
      <ErrorMessage>{error.message}</ErrorMessage>
      <FormBody
        ref={formBodyRef}
        buttonRef={buttonRef}
      >
        <TextInput // Add option for user to use regular uncontrolled text input element instead of TextInput
          name="url"
          placeholder='url'
          inputRef={registerInput(
            'icon-link',
            {
              required: 'Please fill in the URL!',
            },
          )}
          onChange={handleUrlChange}
        />
        <RadioControl
          name="type"
          inputRef={registerInput(
            'icon-tree',
            {
              required: 'Please select a Type!',
            },
          )}
          onChange={memoizedhandleTypeChange}
        >
          <RadioOption value="guide" />
          <RadioOption value="tutorial" />
          <RadioOption value="reference" />
        </RadioControl>
        <MemoizedCheckboxControl
          name="tags"
          inputRef={registerInput(
            'icon-price-tags',
            {
              required: 'Please select a Tag!',
            },
            220,
          )}
          options={tagOptions}
          onChange={memoizedhandleTagChange}
        />
      </FormBody>
    </StyledForm>
  );
}

export default log(Form);