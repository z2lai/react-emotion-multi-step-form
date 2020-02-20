import React from "react";
import styled from "@emotion/styled";

import FormUrlPage from "./FormUrlPage";
import RadioControl from "./RadioControl";
import CheckboxControl from "./CheckboxControl";

// Note: https://emotion.sh/docs/styled#styling-any-component
const StyledForm = styled.div`
  width: 640px;
  margin: auto;
  background: #f7f7f7;
  border: 1px solid black;
`;

class Form extends React.Component {
  formStates = ["Initial", "Scraping Article", "Article Scraped"];
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

  handleNext = event => this.setState(state => ({ formPage: state.formPage + 1 }));
  handleBack = event => this.setState(state => ({ formPage: state.formPage - 1 }));
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

  getCurrentPage = page => {
    return page === 1 ? (
      <FormUrlPage url={this.state.url} updateState={this.updateState} setFormState={this.setFormState} />
    ) : page === 2 ? (
      <RadioControl
        name="type"
        types={this.types}
        selected={this.state.type}
        handleRadioSelection={this.handleRadioSelection}
      />
    ) : page === 3 && this.state.formState === this.formStates[2] ? (
      <CheckboxControl name="topics" topics={this.state.tagOptions} handleCheckboxChange={this.handleCheckboxChange} />
    ) : (
      <div>Loading...</div>
    );
  };

  render() {
    const page = this.state.formPage;
    const currentPage = this.getCurrentPage(page);
    const nextButton = page === 3 ? null : <button onClick={this.handleNext}>Next</button>;
    const backButton = page === 1 ? null : <button onClick={this.handleBack}>Back</button>;
    const submitButton = page === 3 ? <button onClick={this.handleSubmit}>Submit</button> : null;

    return (
      <StyledForm>
        {currentPage}
        {backButton}
        {nextButton}
        {submitButton}
      </StyledForm>
    );
  }
}

export default Form;
