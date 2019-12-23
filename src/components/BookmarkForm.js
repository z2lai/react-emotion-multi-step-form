import React, { Component } from "react";

class BookmarkForm extends Component {
  formStates = ['Initial', 'URL Submitted', 'Article Scraped'];
  types = ['Guide', 'Tutorial', 'Reference']; // should be queried from database
  factors = ['Beginner Friendly', 'Deep Dive', 'Comphrensive']; // should be queried from database


  state = {
    formState: this.formStates[0],
    Url: '',
    article: {},
  };


  componentDidMount() {
    // retrieve types and factors from database
  }

  handleChange = (event) => {
    try {
      const input = event.target.value
      this.setState({ Url: input })
      const cleanedUrl = this.cleanUrl(input);
      if (cleanedUrl) {
        // fetch(`/articles/scrape?Url=${cleanedUrl}`)
        //   .then(scrapedInfo  => showInfo(scrapedInfo))
        //   .catch(err => console.log(err));
        this.setState({
          formState: this.formStates[1],
          Url: cleanedUrl,
        })
      }
    } catch (err) {
      console.log(err);
    }
  }

  cleanUrl(Url) {
    if (Url.length > 0)
    return Url;
  }

  render() {
    return (
      <form className="bookmark-form" action="/articles/add-article" method="POST">
        <input name="URL" type="text" placeholder="Article URL" onChange={this.handleChange} value={this.state.Url} />
        <div className="checkbox">
          {this.types.map(type => <input key={type} type="checkbox" value={type} />)}
        </div>
        <div className="checkbox">
          {this.factors.map(factor => <input key={factor} type="checkbox" value={factor} />)}
        </div>
        {/* <input name="type" type="text" placeholder="Article URL" onChange={this.handleChange} value={this.state.Url} /> */}
        <input type="submit" value="Submit" onSubmit={this.handleSubmit} />
      </form>
      // {this.state.topics.map(topic => <div key={topic}>{topic}</div>)}
    );
  }
}

export default BookmarkForm;