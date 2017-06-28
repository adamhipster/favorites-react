import React, { Component } from 'react';
import './App.css';

// State:
// What the user types in to submit
// The five star rating (todo)
// The Sorting option (todo)

// FavoriteResults depends on FilterSettings (both in ResultsDisplay)
// FavoriteResults depends on SubmitFavorite

// FilterSettings for the sorting option
// App for the submit and five star rating

const favorites = [
  {
    title: 'Facebook React Getting Started',
    url: 'https://facebook.github.io/react/docs/hello-world.html',
    rating: 9,
    tags: ['programming'],
    objectID: 0,
  }, 
  {
    title: 'Hacker News',
    url: 'https://news.ycombinator.com',
    rating: 10,
    tags: ['programming', 'forum'],
    objectID: 1,
  }, 
];

const SubmitFavorite = ({favorite, handleSubmit, handleChange}) =>
  <div className='submit-favorite'>
    <span style={{ padding: '1%'}}>
      <input 
        type="submit" 
        value="Submit" 
        onClick={() => handleSubmit(favorite) }/>
    </span>
    <div style={{ padding: '1%', display: 'inline'}}>
      Widget Rating Placeholder
    </div>
    <div style={{ padding: '1%'}}>
      <input 
        type="text" 
        placeholder="Type URL Here"
        value={favorite}
        onChange={handleChange}
       />
    </div>
  </div>

const RatingWidget = () => 
  <div className='rating-widget'>
    Rating Widget placeholder
  </div>

const ResultsDisplay = ({list}) =>
  <div className='results-display'>
    <FilterSettings />
    <FavoriteResults list={list} />
  </div>

const FilterSettings = () =>
  <div className="filter-settings">
    <span style={{ padding: '1%'}}> 
      <a href="#">Newest First</a>
    </span>
    <span style={{ padding: '1%'}}> 
      <a href="#">Highest Rated</a>
    </span>
  </div>

const FavoriteResults = ({ list }) =>
  <div className="favorite-results">
    { list.map(item =>
      <div key={item.objectID} className="result-row"> 
        <span style={{ width: '40%', padding: '1%'}}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={{ width: '30%'}}> 
        </span>
        <span style={{ width: '10%'}}> 
        </span>
        <span style={{ width: '10%'}}> 
        </span>
        <span style={{ width: '10%'}}>
          {item.rating}
        </span>
      </div> 
    )}
  </div>
        

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: favorites,
      submissionText: '',
      rating: 0,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(url) {
    //todo: validation
    const list = this.state.list;
    const updatedList = [...list, {
      title: url,
      url: url,
      rating: 0,
      tags: [],
      objectID: (list[list.length-1].objectID+1),
    }]
    this.setState( {list: updatedList} )
  }

  handleChange(event) {
    this.setState({
      submissionText: event.target.value,
    })
  }

  render() {
    const { list, submissionText, rating } = this.state;
    return (
      <div className="page">
        <h1>Submit A New Favorite</h1>
        <SubmitFavorite 
          favorite={submissionText} 
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
        <ResultsDisplay list={list} />
      </div>
    );
  }
}

export default App;
