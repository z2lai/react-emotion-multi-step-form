import React from "react";
import styled from "@emotion/styled";

import UrlInputControl from "./UrlInputControl";
import RadioControl from "./RadioControl";
import CheckboxControl from "./CheckboxControl";

// Note: https://emotion.sh/docs/styled#styling-any-component
const StyledForm = styled.div`
  width: 640px;
  margin: auto;
  padding: 0 3rem;
  background-color: #eeeeee;
  h1 {
    padding: 32px 0;
    font-size: 1.125rem;
  }
`;

const FormSection = styled.section`
  width: 100%;
  margin: 1.875rem 0;
  h2 {
    
  }
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

  render() {
    const submitButton = <button onClick={this.handleSubmit}>Submit</button>

    return (
      <StyledForm>
        <h1>Submit An Article To the Javascript Community Curation</h1>
        <FormSection>
          <UrlInputControl url={this.state.url} updateState={this.updateState} setFormState={this.setFormState} />
        </FormSection>
        <FormSection>
          <RadioControl
            name="type"
            types={this.types}
            selected={this.state.type}
            handleRadioSelection={this.handleRadioSelection}
          />
        </FormSection>
        <FormSection>
          {this.state.formState === this.formStates[2] ?
            <CheckboxControl name="topics" topics={this.state.tagOptions} handleCheckboxChange={this.handleCheckboxChange} />
          : <div>Loading...</div>}
        </FormSection>
        {submitButton}
      </StyledForm>
    );
  }
}

export default Form;
