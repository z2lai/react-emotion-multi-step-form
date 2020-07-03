import React, { useState } from "react";

import { InputWrapper, StyledInput } from "./StyledComponents";

import log from "../tests/log";

// const testUrl = "https://css-tricks.com/javascript-scope-closures/";

const UrlControl = React.forwardRef(({ active, value, handleChange, setIsScraped }, ref) => {
  console.log("UrlControl re-rendered!");
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

  // const submitUrl = event => {
  //   const cleanUrl = this.validateUrl(props.url);
  //   if (!cleanUrl) {
  //     props.toggleError('Invalid URL');
  //     return
  //   }
  //   props.toggleError();
  //   fetch(`/articles/scrape?url=${cleanUrl}`)
  //     .then(res => res.json()) // body.json() returns another promise
  //     .then(article => {
  //       let tagOptions = suggestTags(article.topics, article.parentTopics);
  //       props.setTagOptions(tagOptions);
  //       props.setIsScraped();
  //     })
  //     .catch(err => console.log(err));
  // };

  return (
    <InputWrapper active={active}>
      <StyledInput
        autoFocus
        ref={ref}
        type="text"
        placeholder="Article URL"
        value={value}
        onChange={e => handleChange(e.target.value)}
      />
    </InputWrapper>
  );
})

export default UrlControl;
