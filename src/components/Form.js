import React, { useState } from "react";
import styled from "@emotion/styled";

import { StyledForm, Heading, TitleContainer, FormBody, IconContainer, IconWrapper, InputContainer, NextButton, NextButtonIcon } from "./StyledComponents";
import Title from "./Title";
import Icon from "./Icon";
import UrlControl from "./UrlControl";
import RadioControl from "./RadioControl";
import CheckboxControl from "./CheckboxControl";

// Note: https://emotion.sh/docs/styled#styling-any-component

const Form = props => {
  const typeOptions = ["guide", "tutorial", "reference"]; // should be queried from database in a useEffect hook
  // const factors = ["Beginner Friendly", "Deep Dive", "Comphrensive"]; // should be queried from database

  const [activePage, setActivePage] = useState(1);
  const [isScraped, setIsScraped] = useState(false);
  const [article, setArticle] = useState({
    url: '',
    type: '',
    tags: [],
    title: ''
  });
  const [tagOptions, setTagOptions] = useState({
    groupHeadings: ['suggestions', 'parent categories', 'syntax', 'fundamentals'], // need to move this out of state as it never changes
    groups: [
      {
        syntax: false,
        object: false,
        scope: false,
        "execution context": false,
        closures: false,
        nodejs: false,
        es6: false,
        express: false,
        architecture: false,
      },
      {
        syntax: false,
        fundamentals: false,
        "Object Oriented Programming": false,
        "ES6": false,
        "web browser": false,
        "developer tools": false,
        "best practice": false,
      },
      {
        operators: false,
        "control flow": false,
        "data types": false,
      },
      {
        "execution context": false,
        scope: false,
        "error handling": false,
        asynchronous: false
      }
    ]
  });

  // Move this into useEffect hook for loading tag options
  let tagOptionsArray = [];
  tagOptions.groups.forEach(group => tagOptionsArray = [...tagOptionsArray, ...Object.keys(group)]);

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
        <Title value={article.url || 'Input Article URL'} active={activePage === 1} />
        <Title value={article.type || 'Select Resource Type'} active={activePage === 2} />
        <Title value={'Select Article Tags'} active={activePage === 3} />
      </TitleContainer>
      <FormBody page={activePage}>
        <IconContainer>
          <IconWrapper page={activePage}>
            <Icon className="icon-link" active={activePage === 1} />
            <Icon className="icon-tree" active={activePage === 2} />
            <Icon className="icon-price-tags" active={activePage === 3} />
          </IconWrapper>
        </IconContainer>
        <InputContainer>
          <UrlControl
            active={activePage === 1}
            value={article.url}
            setUrl={value => setArticle({ ...article, url: value })}
            setIsScraped={() => setIsScraped(true)}
            toggleError={toggleError}
          />
          <RadioControl
            active={activePage === 2}
            name="type"
            selection={article.type}
            options={typeOptions}
            setType={type => setArticle({ ...article, type })}
          />
          <CheckboxControl
            active={activePage === 3}
            name="topics"
            options={tagOptions}
            setOptionGroups={groups => setTagOptions({ groupHeadings: tagOptions.groupHeadings, groups })} // need to move groupHeadings out of state as it never changes
            optionsArray={tagOptionsArray}
            tags={article.tags} 
            setTags={tags => setArticle({ ...article, tags })}
          />
        </InputContainer>
        <NextButton onClick={handleNext}>
          <NextButtonIcon />
        </NextButton>
      </FormBody>
    </StyledForm>
  );
}

export default Form;
