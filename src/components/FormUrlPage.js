import React from "react";

class FormUrlPage extends React.Component {
  state = {
    invalidUrl: false,
    urlInput: ""
  };

  handleChange = event => {
    const value = event.target.value;
    this.setState({ urlInput: value });
  };

  submitUrl = event => {
    const cleanUrl = this.validateUrl(this.state.urlInput);
    if (!cleanUrl) {
      this.setState({ invalidUrl: true });
      return alert("Invalid URL");
    }
    this.props.saveUrl(cleanUrl);
    fetch(`/articles/scrape?url=${cleanUrl}`)
      .then(scrapedInfo => console.log(scrapedInfo))
      .catch(err => console.log(err));
    this.props.setFormState(1);
  };

  validateUrl = Url => {
    if (Url.length > 0) return Url;
  };

  render() {
    return (
      <div>
        <h1>Enter your article URL:</h1>
        <input
          type="text"
          required
          placeholder="Article URL"
          defaultValue={this.props.url}
          value={this.state.urlInput}
          onChange={this.handleChange}
          onKeyPress={this.submitUrl}
        />
        <button onClick={this.submitUrl}>Submit URL</button>
      </div>
    );
  }
}

export default FormUrlPage;
