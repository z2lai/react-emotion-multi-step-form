import React from "react";
import styled from "@emotion/styled";

import { Heading, TitleContainer, FormBody, IconContainer, IconWrapper, InputContainer, NextButton, NextButtonIcon } from "./StyledComponents";
import Title from "./Title";
import Icon from "./Icon";
import UrlControl from "./UrlControl";
import RadioControl from "./RadioControl";
import CheckboxControl from "./CheckboxControl";

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
  ${props => `background: ${props.theme.colors.light.turqoise};`}
  &:after {
    content: " 🦄";
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
      architecture: false,
      architecture1: false,
      architecture2: false,
      architecture3: false,
      architecture4: false,
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
        <Heading>Submit An Article To the Communal Curator</Heading>
        <TitleContainer>
          <Title title={'Input the Article URL'} active={activePage === 1} />
          <Title title={'Select the Resource Type'} active={activePage === 2} />
          <Title title={'Select the Article Tags'} active={activePage === 3} />
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
            <NextButtonIcon />
          </NextButton>
        </FormBody>
      </StyledForm>
    );
  }
}

export default Form;
