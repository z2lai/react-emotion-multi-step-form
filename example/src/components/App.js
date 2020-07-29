import React from "react";

import "../App.css";
import Form from "./Form";
import ExampleComponent from 'react-emotion-multi-step-form'

class App extends React.Component {
  state = {};

  componentDidMount() {
  }

  render() {
    return (
      <div className="App">
        {/* <Form /> */}
        <ExampleComponent />
      </div>
    );
  }
}

export default App;
