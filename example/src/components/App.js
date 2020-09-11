import React from "react";

import '../App.css';
import SubscriptionForm from "./SubscriptionForm";

class App extends React.Component {
  state = {};

  componentDidMount() {
  }

  render() {
    return (
      <div className="App">
        <SubscriptionForm />
      </div>
    );
  }
}

export default App;
