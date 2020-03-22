import React from "react";
import styled from "@emotion/styled";

import UrlControl from "./UrlControl";
import RadioControl from "./RadioControl";
import CheckboxControl from "./CheckboxControl";

// Note: https://emotion.sh/docs/styled#styling-any-component
const StyledForm = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 60px;
  padding: 10px 50px;
  border-radius: 3px;
  background-color: hsl(0, 0%, 100%);
  box-shadow: 0 8px 10px hsl(120, 60%, 40%);
  text-align: left;
  color: hsl(0, 0%, 20%);
  h1 {
    margin: 0;
    padding: 1.5rem 0;
    font-size: 1.125rem;
    text-align: center;
  }
`;

const StyledButton = styled.button`
    position: absolute;
    right: 5px;
    height: 40px;
    width: 40px;
    border: none;
  `

class Form extends React.Component {
  formStates = ["Initial", "Scraping Article", "Article Scraped"]; // Change this to two states - Loading Article and Loaded
  types = ["Guide", "Tutorial", "Reference"]; // should be queried from database
  factors = ["Beginner Friendly", "Deep Dive", "Comphrensive"]; // should be queried from database

  state = {
    formPage: 1,
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
    let page = this.state.formPage
    if (page !== 3) {
      this.setState({ formPage: page + 1 })
    } else {
      this.setState({ formPage: 1 })
    }
  }

  render() {
    const submitButton = <button onClick={this.handleSubmit}>Submit</button>

    return (
      <StyledForm>
        <UrlControl active={this.state.formPage === 1} url={this.state.url} updateState={this.updateState} setFormState={this.setFormState} />
        <RadioControl
          active={this.state.formPage === 2}
          name="type"
          types={this.types}
          selected={this.state.type}
          handleRadioSelection={this.handleRadioSelection}
        />
        <CheckboxControl active={this.state.formPage === 3} name="topics" topics={this.state.tagOptions} handleCheckboxChange={this.handleCheckboxChange} />
        <StyledButton onClick={this.handleNext}>Next</StyledButton>
        {submitButton}
      </StyledForm>
    );
  }
}

export default Form;