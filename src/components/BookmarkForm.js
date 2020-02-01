import React, { Component } from "react";
import FormPageCaption from "./FormPageCaption";
import FormUrlPage from "./FormUrlPage";
import RadioControl from "./RadioControl";
import CheckboxControl from "./CheckboxControl";

class BookmarkForm extends Component {
  formStates = ["Initial", "Scraping Article", "Article Scraped"];
  types = ["Guide", "Tutorial", "Reference"]; // should be queried from database
  factors = ["Beginner Friendly", "Deep Dive", "Comphrensive"]; // should be queried from database

  state = {
    formPage: 1,
    formState: this.formStates[0],
    url: "",
    type: "",
    factor: "",
    tags: {},
    article: {},
    tagOptions: {},
  };

  componentDidMount() {
    // retrieve types and factors from database
  }
  
  setFormState = stateIndex => this.setState({ formState: this.formStates[stateIndex] });
  
  updateState = (stateProperty, stateValue) => this.setState({ [stateProperty]: stateValue });

  handleNext = event => this.setState(state => ({ formPage: state.formPage + 1 }));
  handleBack = event => this.setState(state => ({ formPage: state.formPage - 1 }));

  handleRadioSelection = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleCheckboxChange = event => {
    const tagOptions = {...this.state.tagOptions}
    tagOptions[event.target.name] = event.target.checked
    this.setState({
      tagOptions
    });
  };

  render() {
    let page = this.state.formPage;
    let currentPage =
      page === 1 ? (
        <FormUrlPage url={this.state.url} updateState={this.updateState} setFormState={this.setFormState} />
      ) : page === 2 ? (
        <RadioControl name="type" types={this.types} selected={this.state.type} handleRadioSelection={this.handleRadioSelection} />
      ) : (page === 3 && this.state.formState === this.formStates[2]) ? (
        <CheckboxControl name="topics" topics={this.state.tagOptions} handleCheckboxChange={this.handleCheckboxChange} />
      ) : (
        <div>Loading...</div>
      )
    
    let nextButton = page === 3 ? null : <button onClick={this.handleNext}>Next</button>;
    let backButton = page === 1 ? null : <button onClick={this.handleBack}>Back</button>;    

    return (
      <div className="bookmark-form">
        {currentPage}
        {backButton}
        {nextButton}
      </div>
    );
  }
}

export default BookmarkForm;
