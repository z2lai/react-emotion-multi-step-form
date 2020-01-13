import React, { Component } from "react";
import RadioControl from './RadioControl';
import FormPageCaption from './FormPageCaption';

class BookmarkForm extends Component {
  formStates = ["Initial", "Scraping Article", "Article Scraped"];
  types = ["Guide", "Tutorial", "Reference"]; // should be queried from database
  factors = ["Beginner Friendly", "Deep Dive", "Comphrensive"]; // should be queried from database

  state = {
    formState: this.formStates[0],
    formPage: 1;
    Url: '',
    article: {},
    type: '',
    factor: '',
  };

  componentDidMount() {
    // retrieve types and factors from database
  }

  handleChange = event => {
    try {
      const value = event.target.value;
      this.setState({ Url: value });
      const cleanedUrl = this.cleanUrl(value);
      if (cleanedUrl) {
        // fetch(`/articles/scrape?Url=${cleanedUrl}`)
        //   .then(scrapedInfo  => showInfo(scrapedInfo))
        //   .catch(err => console.log(err));
        this.setState({
          formState: this.formStates[1],
          Url: cleanedUrl
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  cleanUrl = Url => {
    if (Url.length > 0) return Url;
  }

  handleSelection = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };


  render() {
    return (
      <div className="bookmark-form">
        <formPageCaption page={this.state.formPage} />
        <FormPage page={this.state.formPage} />
        <
        <RadioControl name="type" options={this.types} selected={this.state.type} onChange={this.handleSelection} />
        <RadioControl name="factor" options={this.factors} selected={this.state.factor} onChange={this.handleSelection} />
        <button type="submit">Bookmark!</button>
      </div>
      // {this.state.topics.map(topic => <div key={topic}>{topic}</div>)}
    );
  }
}

export default BookmarkForm;