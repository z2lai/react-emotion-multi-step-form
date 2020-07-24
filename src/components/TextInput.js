import React from "react";

import InputWrapper from "./InputWrapper";
import { StyledInput } from "./StyledComponents";

import useInputState from "../hooks/useInputState";

import log from "../tests/log";

// const testUrl = "https://css-tricks.com/javascript-scope-closures/";

const TextInput = ({ name, inputRef, placeholder, onChange }) => {
  console.log('TextInput rendered!');
  const { value, setValue } = useInputState(name, '', onChange);

  // useEffect(() => {
  //   console.log('TextInput Effect!');
  //   console.log(getInput(name));
  //   handleInputChange.current = getInput(name).handleChange;
  // }, [getInput, name]);

  const handleChange = event => {
    setValue(event.target.value);
  }

  // const validateUrl = url => {
  //   if (url.length > 0) return url;
  // };

  // const suggestTags = (childTopics, parentTopics) => {
  //   let topics = {};
  //   childTopics.forEach(topic => {
  //     if (!topics[topic]) topics[topic] = false; // initial checked status of topic checkbox
  //   });
  //   parentTopics.forEach(topic => {
  //     if (!topics[topic]) topics[topic] = false;
  //   });
  //   return topics;
  // };

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
    <InputWrapper name={name}>
      <StyledInput
        type="text"
        name={name}
        ref={inputRef}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </InputWrapper>
  );
};

export default TextInput;