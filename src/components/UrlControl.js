import React from "react";

import { InputWrapper, StyledInput } from "./StyledComponents";

// const testUrl = "https://css-tricks.com/javascript-scope-closures/";

const UrlControl = props => {
  const validateUrl = url => {
    if (url.length > 0) return url;
  };

  const suggestTags = (childTopics, parentTopics) => {
    let topics = {};
    childTopics.forEach(topic => {
      if (!topics[topic]) topics[topic] = false; // initial checked status of topic checkbox
    });
    parentTopics.forEach(topic => {
      if (!topics[topic]) topics[topic] = false;
    });
    return topics;
  };

  const submitUrl = event => {
    const cleanUrl = this.validateUrl(props.url);
    if (!cleanUrl) {
      props.toggleError('Invalid URL');
      return
    }
    props.toggleError();
    fetch(`/articles/scrape?url=${cleanUrl}`)
      .then(res => res.json()) // body.json() returns another promise
      .then(article => {
        let tagOptions = suggestTags(article.topics, article.parentTopics);
        props.setTagOptions(tagOptions);
        props.setIsScraped();
      })
      .catch(err => console.log(err));
  };

  return (
    <InputWrapper active={props.active}>
      <StyledInput
        type="text"
        placeholder="Article URL"
        value={props.value}
        onChange={event => props.setUrl(event.target.value)} />
    </InputWrapper>
  );
}

export default UrlControl;
