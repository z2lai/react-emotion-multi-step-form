import React, { Component } from 'react';
import BookmarkForm from './BookmarkForm';
import '../App.css';

class App extends Component {
  state = { };
  
  componentDidMount() {
    // fetch('/articles/topics')
    // .then(res => res.json())
    // .then(topics => this.setState({ topics }))
    // .catch(err => console.log(err));
  }
  
  render() {
    return (
      <div className="App">
        <BookmarkForm />
      </div>
    )
  };
}

export default App;