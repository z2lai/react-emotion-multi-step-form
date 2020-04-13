import React from "react";
import styled from "@emotion/styled";

import Icon from "./Icon";
import TitleControl from "./TitleControl";
import UrlControl from "./UrlControl";
import RadioControl from "./RadioControl";
import CheckboxControl from "./CheckboxControl";
import { StyledInputWrapper, StyledInput } from './Input';

// Note: https://emotion.sh/docs/styled#styling-any-component

const StyledForm = styled.div`
  box-sizing: content-box;
  width: 900px;
  height: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  border: 3px double hsl(0, 0%, 13%); 
  transform: translate(-50%, -50%);
  text-align: center;
  background: #B7DDC3;
  &:after {
    content: " 🦄";
  }
`

const StyledHeading = styled.h1`
  margin: 50px 0 20px 0;
  font-size: 1.875rem;
`

const InputControl = styled.div`
  margin: 20px auto;
  width: 600px;
  max-height: 60px;
  padding: 10px 0;
  overflow: hidden;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  border-radius: 3px;
  background-color: hsl(0, 0%, 100%);
  box-shadow: 0 8px 10px hsl(120, 60%, 40%);
  text-align: left;
  color: hsl(0, 0%, 20%);
  transition: max-height 600ms ease-in-out;
  ${props => (props.page === 3) ? "max-height: 240px;" : "" }
  h1 {
    margin: 0;
    padding: 1.5rem 0;
    font-size: 1.125rem;
    text-align: center;
  }
`;

const IconContainer = styled.div`
  height: 40px;
  width: 34px;
  margin: 0 0 0 8px;
  overflow: hidden;
`

const IconsWrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  line-height: 40px;
  transition: top 400ms;
  ${props => (
    (props.page === 1) ? `
      top: 0px;
    ` : (props.page === 2) ? ` 
      top: -40px; 
    ` : ` 
      top: -80px;
    `
  )}
`

const InputContainer = styled.div`
  position: relative;
  margin: 0 8px;
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
`

const NextButton = styled.button`
  position: relative;
  height: 40px;
  width: 34px;
  margin: 0 8px 0 0;
  border: 1px black;
  background: none;
  outline: none;
  cursor: pointer;
  &:hover {
    background: hsl(0, 0%, 95%);
    border-radius: 3px;
    transition: background 0.3s ease;
  }
  &:active {
    top: 2px;
    background-color: hsl(0, 0%, 100%);
    transition-property: none;
  }
  `

const NextIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2px;
  height: 17px;
  background: hsl(0, 0%, 20%);
  &::before {
    content: '';
    position: absolute;
    left: -3px;
    bottom: 1px;
    width: 6px;
    height: 6px;
    transform: rotate(45deg);
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: hsl(0, 0%, 20%);
  }
`

class Form extends React.Component {
  formStates = ["Initial", "Scraping Article", "Article Scraped"]; // Change this to two states - Loading Article and Loaded
  types = ["guide", "tutorial", "reference"]; // should be queried from database
  factors = ["Beginner Friendly", "Deep Dive", "Comphrensive"]; // should be queried from database

  state = {
    activePage: 1,
    // formState: this.formStates[0],
    formState: this.formStates[2],
    url: "",
    type: "",
    factor: "",
    tags: {},
    article: {},
    // tagOptions: {},
    tagOptions: {
      syntax: false,
      object: false,
      "execution context": false,
      scope: false,
      closures: false,
      nodejs: false,
      es6: false,
      express: false,
      architecture: false
    }
  };

  componentDidMount() {
    // retrieve types and factors from database
  }

  setFormState = stateIndex => this.setState({ formState: this.formStates[stateIndex] });

  updateState = (stateProperty, stateValue) => this.setState({ [stateProperty]: stateValue });

  handleSubmit = event => {
    const tagOptions = this.state.tagOptions;
    const topics = Object.keys(tagOptions).filter(topic => tagOptions[topic]);
    console.log(topics);
    const body = {
      _id: this.state.url,
      title: this.state.article.title,
      topics
    };
    fetch("/articles/add", {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    })
      // .then(response => response.json())
      .then(result => console.log(result));
  };

  handleRadioSelection = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleCheckboxChange = event => {
    const tagOptions = { ...this.state.tagOptions };
    tagOptions[event.target.value] = event.target.checked;
    this.setState({
      tagOptions
    });
  };

  handleNext = event => {
    let page = this.state.activePage
    if (page !== 3) {
      this.setState({ activePage: page + 1 })
    } else {
      this.setState({ activePage: 1 })
    }
  }

  render() {
    let activePage = this.state.activePage
    return (
      <StyledForm>
        <StyledHeading>Submit An Article To the Communal Curator</StyledHeading>
        <TitleControl page={activePage} />
        <InputControl page={activePage}>
          <IconContainer>
            <IconsWrapper page={activePage}>
              <Icon className="icon-link" active={activePage === 1} />
              <Icon className="icon-tree" active={activePage === 2} />
              <Icon className="icon-price-tags" active={activePage === 3} />
            </IconsWrapper>
          </IconContainer>
          <InputContainer>
            <UrlControl active={activePage === 1} url={this.state.url} updateState={this.updateState} setFormState={this.setFormState} />
            <RadioControl
              active={activePage === 2}
              name="type"
              types={this.types}
              selected={this.state.type}
              handleRadioSelection={this.handleRadioSelection}
            />
            <CheckboxControl active={activePage === 3} name="topics" topics={this.state.tagOptions} handleCheckboxChange={this.handleCheckboxChange} />
          </InputContainer>
          <NextButton onClick={this.handleNext}>
            <NextIcon />
          </NextButton>
        </InputControl>
      </StyledForm>
    );
  }
}

export default Form;
