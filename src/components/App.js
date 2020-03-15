// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { Component } from "react";
import { jsx } from "@emotion/core";

import Form from "./Form";
import "../App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    // fetch('/articles/topics')
    // .then(res => res.json())
    // .then(topics => this.setState({ topics }))
    // .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <h1>Submit An Article To the Javascript Community Curation</h1>
        <Form />;
      </div>
    );
  }
}

export default App;
