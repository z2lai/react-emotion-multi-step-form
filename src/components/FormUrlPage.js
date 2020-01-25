import React from "react";

const testUrl = 'https://css-tricks.com/javascript-scope-closures/';

class FormUrlPage extends React.Component {
  state = {
    invalidUrl: false,
    urlInput: this.props.url || '' // should I just remove this and use the url state of the parent?
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
    this.setState({ urlInput: cleanUrl });
    this.props.saveUrl(cleanUrl);
    fetch(`/articles/scrape?url=${cleanUrl}`)
      .then(res => res.json()) // body.json() returns another promise
      .then(articleInfo => this.props.saveArticle(articleInfo))
      .catch(err => console.log(err));
    this.props.setFormState(1);
  };

  validateUrl = Url => {
    if (Url.length > 0) return Url;
  };

  render() {
    return (
      <div>
        <h1>Enter your article URL: {testUrl}</h1>
        <input
          type="text"
          required
          placeholder="Article URL"
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
