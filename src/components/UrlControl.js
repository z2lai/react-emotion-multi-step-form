import React from "react";
import styled from "@emotion/styled";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";

import { StylesProvider } from "@material-ui/styles";

import StyledControlWrapper from "./StyledControlWrapper";

const testUrl = "https://css-tricks.com/javascript-scope-closures/";

const StyledFormControl = styled(FormControl)`
  flex-direction: row
`;

// const StyledInput = styled.input`
//   flex: 1 1 auto;
//   border-radius: 4px 0 0 4px;
//   padding: 0 2px;
//   font-size: 1rem;
//   font-family: inherit;
//   color: #333;
//   background: #f5f5f5;
// `;
const StyledInput = styled(OutlinedInput)``;

const StyledButton = styled(Button)`
  font: inherit;
`;

class UrlControl extends React.Component {
  state = {
    invalidUrl: false,
    urlInput: this.props.url || "" // should I just remove this and use the url state of the parent?
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
    this.props.updateState("url", cleanUrl);
    this.props.setFormState(1);
    fetch(`/articles/scrape?url=${cleanUrl}`)
      .then(res => res.json()) // body.json() returns another promise
      .then(articleInfo => {
        this.props.updateState("article", articleInfo);
        let suggestedTags = this.suggestTags(articleInfo.topics, articleInfo.parentTopics);
        this.props.updateState("tagOptions", suggestedTags);
        this.props.setFormState(2);
      })
      .catch(err => console.log(err));
  };

  validateUrl = Url => {
    if (Url.length > 0) return Url;
  };

  suggestTags = (childTopics, parentTopics) => {
    let topics = {};
    childTopics.forEach(topic => {
      if (!topics[topic]) topics[topic] = false;
    });
    parentTopics.forEach(topic => {
      if (!topics[topic]) topics[topic] = false;
    });
    return topics;
  };

  render() {
    return (
      <StylesProvider injectFirst>
        <StyledFormControl varient="outlined">
          <InputLabel htmlFor="url">Article URL</InputLabel>
          <StyledInput
            type="text"
            id="url"
            value={this.state.urlInput}
            onChange={this.handleChange}
            onKeyPress={this.submitUrl}
          />
          <StyledButton variant="contained" disableElevation onClick={this.submitUrl}>
            Submit URL
          </StyledButton>
        </StyledFormControl>
      </StylesProvider>
    );
  }
}

export default UrlControl;
