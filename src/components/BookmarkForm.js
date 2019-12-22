import React, { Component } from "react";

class BookmarkForm extends Component {
  state = { topics: [] };
  
  componentDidMount() {
  }
  
  render() {
    return (
      <form className="bookmark-form" action="/articles/add-article" method="POST">
        <input name="URL" type="text" placeholder="Article URL" />
        <input type="submit" value="Submit" />
      </form>
      // {this.state.topics.map(topic => <div key={topic}>{topic}</div>)}
      );
    }
  }
  
  export default BookmarkForm;