import React, { useState, useRef, useCallback, useEffect } from "react";

import useForm from '../useForm';
import {
  StyledForm, Heading, TitleContainer, ErrorMessage, IconContainer, IconWrapper, InputContainer,
  SubmitLabel, NextButton, NextButtonIcon
} from "./StyledComponents";
import Title from "./Title";
import FormBody from "./FormBody";
import Icon from "./Icon";
import TextInput from "./TextInput";
import RadioControl from "./RadioControl";
import CheckboxControl from "./CheckboxControl";
import log from "../tests/log";

const MemoizedTitle = React.memo(Title);
const MemoizedIcon = React.memo(Icon);
const MemoizedRadioControl = React.memo(RadioControl);
const MemoizedCheckboxControl = React.memo(CheckboxControl);

const Form = props => {
  console.log('Form rendered!');
  const { registerInput, inputs } = useForm();
  // const factors = ["Beginner Friendly", "Deep Dive", "Comphrensive"]; // should be queried from database

  const [activePage, setActivePage] = useState(1);
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

  const [error, setError] = useState({
    state: false,
    message: ''
  })

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
    setErrorMessage();
    setUrl(url);
  }

  const memoizedhandleTypeChange = useCallback(
    type => {
      console.log('handleType');
      setErrorMessage();
      setType(type);
    },
    [article]
  );

  // Combine this function with the function above?
  const memoizedhandleTagChange = useCallback(
    tags => {
      setErrorMessage();
      setTags(tags);
    },
    [article]
  );

  const submit = () => {
    console.log('Article submitted!');
  };

  const setErrorMessage = message => {
    if (message) {
      setError({ state: true, message });
    } else {
      setError({ state: false, message: '' });
    }
  }

  const changeActivePage = newActivePage => {
    const isNextPage = newActivePage > activePage;
    /* 
      1. Focus Input or FormBody
      2. setErrorMessage 
    */
   if (isNextPage) {
      const input = inputs[activePage - 1];
      const error = input.validate(); // returns error message
      console.log(error);
      if (error) {
        input.node.focus();
        return setErrorMessage(error);
      }
    }

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
    setErrorMessage('');
    setActivePage(newActivePage);
    formBodyRef.current.focus();
  }

  const handleNext = event => {
    changeActivePage(activePage + 1);
  };

  useEffect(() => console.log(inputs));

  return (
    <StyledForm ref={formRef} tabIndex={-1}>
      <Heading>Submit An Article To the Communal Curator</Heading>
      <TitleContainer>
        <MemoizedTitle
          value={article.url || 'Input Article URL'}
          page={1}
          active={activePage === 1}
          changeActivePage={changeActivePage}
          errorState={error.state}
        />
        <MemoizedTitle
          value={article.type || 'Select Resource Type'}
          page={2}
          active={activePage === 2}
          changeActivePage={changeActivePage}
          errorState={error.state}
        />
        <MemoizedTitle
          value={(article.tags.length && article.tags.join(', ')) || 'Select Article Tags'}
          page={3}
          active={activePage === 3}
          changeActivePage={changeActivePage}
          errorState={error.state}
        />
      </TitleContainer>
      <ErrorMessage>{error.message}</ErrorMessage>
      <FormBody ref={formBodyRef} buttonRef={buttonRef} activePage={activePage} errorState={error.state}>
        <IconContainer page={activePage}>
          <IconWrapper page={activePage}>
            <MemoizedIcon className="icon-link" active={activePage === 1} />
            <MemoizedIcon className="icon-tree" active={activePage === 2} />
            <MemoizedIcon className="icon-price-tags" active={activePage === 3} page={activePage} />
          </IconWrapper>
        </IconContainer>
        <InputContainer page={activePage}>
          <TextInput
            inputRef={registerInput('url', 'icon-link', {
              required: 'Please input the URL', // boolean or error message string
              // minLength: 3 or { value: 3, message: 'error message' },
              // maxLength: 16 or { value: 16, message: 'error message' },
              //pattern: `regex pattern`
              //validate: { validator: customValidatorFunc, message: customMessageFunc }
            })} // for associating page number, icon, input validation, error message and focusing input ref on error
            handleChange={handleUrlChange}
            active={activePage === 1}
          />
          <TextInput
            inputRef={registerInput('test', 'icon-link', {
              required: 'Please input the test-URL', // boolean or error message string
              // minLength: 3 or { value: 3, message: 'error message' },
              // maxLength: 16 or { value: 16, message: 'error message' },
              //pattern: `regex pattern`
              //validate: { validator: customValidatorFunc, message: customMessageFunc }
            })} // for associating page number, icon, input validation, error message and focusing input ref on error
            handleChange={handleUrlChange}
            active={activePage === 2}
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
          <SubmitLabel page={activePage} />
        </InputContainer>
        <NextButton ref={buttonRef} onClick={handleNext} page={activePage} disabled={activePage === 4}>
          <NextButtonIcon />
        </NextButton>
      </FormBody>
    </StyledForm>
  );
}

export default log(Form);