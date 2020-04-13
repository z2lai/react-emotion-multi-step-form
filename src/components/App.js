import React from "react";
import { ThemeProvider } from 'emotion-theming'

import Form from "./Form";
import "../App.css";
import "../fonts/icomoon/style.css"

const theme = {
  colors: {
    base: {
      guide: 'hsl(120, 50%, 50%)',
      tutorial: 'hsl(240, 50%, 50%)',
      reference: 'hsl(0, 50%, 50%)',
      turqoise: 'hsl(139, 50%, 50%)',
      purple: 'hsl(319, 50%, 50%)',
    },
    dark: {
      guide: 'hsl(120, 50%, 35%)',
      tutorial: 'hsl(240, 50%, 35%)',
      reference: 'hsl(0, 50%, 35%)',
      purple: 'hsl(319, 50%, 35%)',
    },
    light: {
      guide: 'hsl(120, 50%, 75%)',
      tutorial: 'hsl(240, 50%, 75%)',
      reference: 'hsl(0, 50%, 75%)',
      turqoise: 'hsl(139, 50%, 75%)',
    },
    extraLight: {
      turqoise: 'hsl(139, 50%, 90%)',
      purple: 'hsl(319, 50%, 90%)',
    },
    white: 'hsl(0, 100%, 99%)',
    black: 'hsl(0, 0%, 13%)',
    lightGrey: 'hsl(0, 0%, 93%)',
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
