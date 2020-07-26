import React from "react";

import "../App.css";
import "../fonts/icomoon/style.css"

import { ThemeProvider } from 'emotion-theming'
import { FormProvider } from '../context/FormContext';
import Form from "./Form";

class App extends React.Component {
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
        <Form />
      </div>
    );
  }
}

export default App;
