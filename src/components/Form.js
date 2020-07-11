import React, { useState, useRef, useCallback, useEffect } from "react";

import useInputs from '../hooks/useInputs';
import {
  StyledForm, Heading, TitleContainer, ErrorMessage, IconContainer, IconWrapper, InputContainer,
  SubmitLabel, NextButton, NextButtonIcon
} from "./StyledComponents";
import Title from "./Title";
import FormBody from "./FormBody";
import TextInput from "./TextInput";
import RadioControl from "./RadioControl";
import CheckboxControl from "./CheckboxControl";
import log from "../tests/log";
import useActiveIndex from "../hooks/useActiveIndex";
import useError from '../hooks/useError';

const MemoizedTitle = React.memo(Title);
const MemoizedRadioControl = React.memo(RadioControl);
const MemoizedCheckboxControl = React.memo(CheckboxControl);

const Form = props => {
  console.log('Form rendered!');
  const registerInput = useInputs()[1];
  const [activeIndex, changeActiveIndex] = useActiveIndex();
  const error = useError()[0];
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
    console.log('handleUrlChange')
    setUrl(url);
  }

  const memoizedhandleTypeChange = useCallback(
    type => {
      console.log('handleType');
      setType(type);
    },
    [article]
  );

  // Combine this function with the function above?
  const memoizedhandleTagChange = useCallback(
    tags => {
      setTags(tags);
    },
    [article]
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

  //   // switch (activePage) {
  //   //   case 1:
  //   //     if (isNextPage && url === '') {
  //   //       urlInputRef.current.focus();
  //   //       return setErrorMessage('Please fill in the URL!');
  //   //     }
  //   //     setArticle({ ...article, url });
  //   //     break;
  //   //   case 2:
  //   //     if (isNextPage && type === '') {
  //   //       formBodyRef.current.focus();
  //   //       return setErrorMessage('Please select a Type!');
  //   //     }
  //   //     setArticle({ ...article, type });
  //   //     break;
  //   //   case 3:
  //   //     if (isNextPage && tags.length === 0) {
  //   //       tagInputRef.current.focus();
  //   //       return setErrorMessage('Please select a Tag!');
  //   //     }
  //   //     setArticle({ ...article, tags });
  //   //     break;
  //   // }
  //   setErrorMessage('');
  //   setActivePage(newActivePage);
  //   formBodyRef.current.focus();
  // }

  // useEffect(() => {
  //   inputsRef.current = Object.values(inputs) // need to change inputs to a set to guaruntee order when converted to array
  //   console.log(inputsRef.current);
  // }, []);

  return (
    <StyledForm ref={formRef} tabIndex={-1}>
      <Heading>Submit An Article To the Communal Curator</Heading>
      <TitleContainer>
        <MemoizedTitle
          value={article.url || 'Input Article URL'}
          page={0}
          active={activeIndex === 0}
          changeActivePage={changeActiveIndex}
        />
        <MemoizedTitle
          value={article.type || 'Select Resource Type'}
          page={1}
          active={activeIndex === 1}
          changeActivePage={changeActiveIndex}
        />
        <MemoizedTitle
          value={(article.tags.length && article.tags.join(', ')) || 'Select Article Tags'}
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
        <TextInput
          name="url"
          placeholder='url'
          inputRef={registerInput('icon-link', {
            required: 'Please fill in the URL!', // boolean or error message string
            // minLength: 3 or { value: 3, message: 'error message' },
            // maxLength: 16 or { value: 16, message: 'error message' },
            //pattern: `regex pattern`
            //validate: { validator: customValidatorFunc, message: customMessageFunc }
          })} // for associating page number, icon, input validation, error message and focusing input ref on error
          // handleChange={handleUrlChange}
          // active={activeInputIndex === 0}
        />
        <TextInput
          name='type'
          placeholder='type'
          inputRef={registerInput('icon-tree', {
            required: 'Please select a Type!',
          })}
          // active={activeInputIndex === 1}
          />
        <TextInput
          name='tags'
          placeholder='tags'
          inputRef={registerInput('icon-price-tags', {
            required: 'Please select a Tag!',
          })}
          // active={activeInputIndex === 2}
        />
        {/* <MemoizedRadioControl // this component probably does not need to be memoized as it's relatively small
            name="type"
            active={activePage === 2}
            selection={type}
            handleChange={memoizedhandleTypeChange}
          />
          <MemoizedCheckboxControl
            name="topics"
            ref={tagInputRef}
            active={activePage === 3}
            options={tagOptions}
            setTags={memoizedhandleTagChange}
          /> */}
      </FormBody>
    </StyledForm>
  );
}

export default log(Form);