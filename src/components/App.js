import React from "react";
import { ThemeProvider } from 'emotion-theming'

import Form from "./Form";
import "../App.css";
import "../fonts/icomoon/style.css"

const theme = {
  colors: {
    base: {
      guide: 'hsl(120, 52%, 48%)',
      tutorial: 'hsl(240, 52%, 48%)',
      reference: 'hsl(0, 52%, 48%)',
      turqoise: 'hsl(139, 36%, 79%)',
    },
    light: {
      guide: 'hsl(120, 52%, 75%)',
      tutorial: 'hsl(240, 52%, 75%)',
      reference: 'hsl(0, 52%, 75%)',
      grey: 'hsl(0, 0%, 93%)',
    },
    dark: {
      grey: 'hsl(0, 0%, 13%)'
    },
    white: 'hsl(0, 100%, 99%)',
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
        <Form />
      </div>
      </ThemeProvider>
    );
  }
}

export default App;
