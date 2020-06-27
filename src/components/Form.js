import React, { useState, useCallback } from "react";

import { StyledForm, Heading, TitleContainer, ErrorMessage, IconContainer, IconWrapper, InputContainer, 
  SubmitLabel, NextButton, NextButtonIcon } from "./StyledComponents";
import Title from "./Title";
import FormBody from "./FormBody";
import Icon from "./Icon";
import UrlControl from "./UrlControl";
import RadioControl from "./RadioControl";
import CheckboxControl from "./CheckboxControl";
import log from "../tests/log";

const MemoizedTitle = React.memo(Title);
const MemoizedIcon = React.memo(Icon);
const MemoizedRadioControl = React.memo(RadioControl);
const MemoizedCheckboxControl = React.memo(CheckboxControl);

const Form = props => {
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
    status: false,
    message: ''
  })

  // Use this function for all input validations
  const toggleError = message => {
    if (message) {
      setError({ status: true, message });
    } else {
      setError({ status: false, message: '' });
    }
  }
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
    toggleError();
    setUrl(url);
  }

  const memoizedhandleTypeChange = useCallback(
    type => {
      toggleError();
      setType(type);
    },
    [article]
  );

  // Combine this function with the function above?
  const memoizedhandleTagChange = useCallback(
    tags => {
      toggleError();
      setTags(tags);
    },
    [article]
  );
  
  const submit = () => {
    console.log('Article submitted!');
  };

  const handleNext = event => {
    switch (activePage) {
      case 1:
        if (url === '') return toggleError('Please fill in the URL!');
        setArticle({ ...article, url });
        break;
      case 2:
        if (type === '') return toggleError('Please select a Type!');
        setArticle({ ...article, type });
        break;
      case 3:
        if (tags.length === 0) return toggleError('Please select a Tag!');
        setArticle({ ...article, tags });
        break;
    }
    if (error.status = true) toggleError();

    if (activePage !== 4) {
      setActivePage(activePage + 1);
    } else {
      submit();
    }
  };

  const handleTitleClick = page => {
    setActivePage(page);
  }

  return (
    <StyledForm>
      <Heading>Submit An Article To the Communal Curator</Heading>
      <TitleContainer>
        <MemoizedTitle 
          value={article.url || 'Input Article URL'} 
          page={1} 
          active={activePage === 1} 
          setActivePage={setActivePage} 
        />
        <MemoizedTitle 
          value={article.type || 'Select Resource Type'} 
          page={2} 
          active={activePage === 2} 
          setActivePage={setActivePage} 
        />
        <MemoizedTitle 
          value={(article.tags.length && article.tags.join(', ')) || 'Select Article Tags'} 
          page={3} 
          active={activePage === 3} 
          setActivePage={setActivePage} 
        />
      </TitleContainer>
      <ErrorMessage>{error.message}</ErrorMessage>
      <FormBody page={activePage} errorStatus={error.status}>
        <IconContainer page={activePage}>
          <IconWrapper page={activePage}>
            <MemoizedIcon className="icon-link" active={activePage === 1} />
            <MemoizedIcon className="icon-tree" active={activePage === 2} />
            <MemoizedIcon className="icon-price-tags" active={activePage === 3} page={activePage} />
          </IconWrapper>
        </IconContainer>
        <InputContainer page={activePage}>
          <UrlControl
            name="url"
            active={activePage === 1}
            value={url}
            handleChange={handleUrlChange}
            setIsScraped={() => setIsScraped(true)}
            toggleError={toggleError}
          />
          <MemoizedRadioControl // this component probably does not need to be memoized as it's relatively small
            name="type"
            active={activePage === 2}
            selection={type}
            handleChange={memoizedhandleTypeChange}
          />
          <MemoizedCheckboxControl
            name="topics"
            active={activePage === 3}
            options={tagOptions}
            setTags={memoizedhandleTagChange}
          />
          <SubmitLabel page={activePage} />
        </InputContainer>
        <NextButton onClick={handleNext} page={activePage}>
          <NextButtonIcon />
        </NextButton>
      </FormBody>
    </StyledForm>
  );
}

export default log(Form);