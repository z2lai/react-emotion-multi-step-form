import React, { useState, useCallback } from "react";
import styled from "@emotion/styled";

import { StyledForm, Heading, TitleContainer, FormBody, IconContainer, IconWrapper, InputContainer, NextButton, NextButtonIcon } from "./StyledComponents";
import Title from "./Title";
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
    type: '',
    tags: [],
    title: ''
  });
  const [url, setUrl] = useState(''); // url has to be separated from article object as we don't want all components that use article for props to re-render whenever we update article state with a new url through the input onChange event handler
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
    errorStatus: false,
    errorMessage: ''
  })

  // Use this function for all input validations
  const toggleError = message => {
    if (message) {
      setError({ errorStatus: true, errorMessage: message });
      alert(`Error: ${message}`);
    } else {
      setError({ errorStatus: false, errorMessage: '' });
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

  const memoizedhandleTypeChange = useCallback(
    type => {
      setArticle({ ...article, type })
    },
    []
  );
  
  // Combine this function with the function above?
  const memoizedhandleTagChange = useCallback(
    tags => {
      setArticle({ ...article, tags })
    },
    [article]
  );

  const handleNext = event => {
    let page = activePage;
    if (page !== 3) {
      setActivePage(page + 1);
    } else {
      setActivePage(1);
    }
  };

  return (
    <StyledForm>
      <Heading>Submit An Article To the Communal Curator</Heading>
      <TitleContainer>
        {/* <MemoizedTitle value={article.url || 'Input Article URL'} active={activePage === 1} /> */}
        <MemoizedTitle value={article.type || 'Select Resource Type'} active={activePage === 2} />
        <MemoizedTitle value={'Select Article Tags'} active={activePage === 3} />
      </TitleContainer>
      <FormBody page={activePage}>
        <IconContainer>
          <IconWrapper page={activePage}>
            <MemoizedIcon className="icon-link" active={activePage === 1} />
            <MemoizedIcon className="icon-tree" active={activePage === 2} />
            <MemoizedIcon className="icon-price-tags" active={activePage === 3} />
          </IconWrapper>
        </IconContainer>
        <InputContainer>
          <UrlControl
            name="url"
            active={activePage === 1}
            value={url}
            handleChange={setUrl}
            setIsScraped={() => setIsScraped(true)}
            toggleError={toggleError}
          />
          <MemoizedRadioControl // this component probably does not need to be memoized as it's relatively small
            name="type"
            active={activePage === 2}
            selection={article.type}
            handleChange={memoizedhandleTypeChange}
          />
          <MemoizedCheckboxControl
            name="topics"
            active={activePage === 3}
            options={tagOptions}
            tags={article.tags}
            setTags={memoizedhandleTagChange}
          />
        </InputContainer>
        <NextButton onClick={handleNext}>
          <NextButtonIcon />
        </NextButton>
      </FormBody>
    </StyledForm>
  );
}

export default log(Form);