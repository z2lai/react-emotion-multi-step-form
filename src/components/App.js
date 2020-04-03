import React from "react";
import { ThemeProvider } from 'emotion-theming'

import Form from "./Form";
import "../App.css";
import "../fonts/icomoon/style.css"

const theme = {
  colors: {
    guide: 'hsl(120, 52%, 48%)',
    tutorial: 'hsl(240, 52%, 48%)',
    reference: 'hsl(0, 52%, 48%)',
  }
}

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
      <ThemeProvider theme={theme}>
      <div className="App">
        <h1>Submit An Article To the Communal Curator</h1>
        <Form />
      </div>
      </ThemeProvider>
    );
  }
}

export default App;
