import React, { Component } from "react";
import RadioControl from "./RadioControl";
import FormPageCaption from "./FormPageCaption";
import FormUrlPage from "./FormUrlPage";
import FormTagPage from "./FormTagPage";

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
    article: {}
  };

  componentDidMount() {
    // retrieve types and factors from database
  }

  saveUrl = url => this.setState({ url });

  setFormState = stateIndex => this.setState({ formState: this.formStates[stateIndex] });

  setArticleState = article => this.setState({ article });

  // handleChange = event => {
  //   try {
  //     const value = event.target.value;
  //     const name = event.target.name;
  //     if (name === url) {
  //       this.setState({ urlValue: value });
  //     }
  //     const cleanedUrl = this.cleanUrl(value);
  //     if (cleanedUrl) {
  //       fetch(`/articles/scrape?Url=${cleanedUrl}`)
  //         .then(scrapedInfo  => showInfo(scrapedInfo))
  //         .catch(err => console.log(err));
  //       this.setState({
  //         formState: this.formStates[1],
  //         Url: cleanedUrl
  //       });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  handleNext = event => this.setState(state => ({ formPage: state.formPage + 1 }));
  handleBack = event => this.setState(state => ({ formPage: state.formPage - 1 }));

  handleSelection = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    let page = this.state.formPage;
    let currentPage =
      page === 1 ? (
        <FormUrlPage url={this.state.url} saveUrl={this.saveUrl} setFormState={this.setFormState} saveArticle={this.setArticleState} />
      ) : page === 2 ? (
        <RadioControl name="type" options={this.types} selected={this.state.type} onChange={this.handleSelection} />
      ) : (
        <FormTagPage />
      );
    
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
