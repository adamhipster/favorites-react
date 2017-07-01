import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';

// StarRatingComponent.propTypes = {
//     name: _react.PropTypes.string.isRequired,
//     value: _react.PropTypes.number,
//     editing: _react.PropTypes.bool,
//     starCount: _react.PropTypes.number,
//     starColor: _react.PropTypes.string,
//     onStarClick: _react.PropTypes.func,
//     renderStarIcon: _react.PropTypes.func,
//     renderStarIconHalf: _react.PropTypes.func
//   };
//   StarRatingComponent.defaultProps = {
//     starCount: 5,
//     value: 0,
//     editing: true,
//     starColor: '#ffb400',
//     emptyStarColor: '#333'
//   };

//30 June 2017: if it's one month later than this date, update this package it has a proptype warning.
//the npm registry does not have the latest version
import StarRatingComponent from 'react-star-rating-component';

import 'materialize-css/dist/css/materialize.css';
// import 'jquery/dist/jquery.js';
// import 'materialize-css/dist/js/materialize.js';

import './App.css';

const favorites = [
  {
    title: 'Facebook React Getting Started',
    url: 'https://facebook.github.io/react/docs/hello-world.html',
    rating: 4,
    tags: ['programming'],
    date: new Date("Wed Jun 28 2017 19:47:49 GMT+0200 (CEST)"),
    objectID: 0,
  }, 
  {
    title: 'Stack Overflow',
    url: 'https://www.stackoverflow.com',
    rating: 3,
    tags: ['programming'],
    date: new Date("Sat Jun 10 2017 19:47:49 GMT+0200 (CEST)"),
    objectID: 1,
  }, 
  {
    title: 'Hacker News',
    url: 'https://news.ycombinator.com',
    rating: 5,
    tags: ['programming', 'forum'],
    date: new Date("Mon Aug 28 2017 19:47:49 GMT+0200 (CEST)"),
    objectID: 2,
  }, 
];

const SubmitFavorite = ({favorite, handleSubmit, handleChange, onStarClick}) =>
  <div className='submit-favorite'>
    <div className='submit-favorite-upper'>
      <span style={{ padding: '1%'}}>
        <input 
          type="submit" 
          value="Submit" 
          onClick={() => handleSubmit(favorite) }/>
      </span>
      <StarRatingComponent 
        name="rateSubmit" 
        starCount={5}
        value={0}
        onStarClick={onStarClick}
      />
    </div>
    <div className='submit-favorite-lower' style={{ padding: '1%'}}>
      <input 
        type="text" 
        placeholder="Type URL Here"
        value={favorite}
        onChange={handleChange}
       />
    </div>
  </div>

const ResultsDisplay = ({list, submissionText, rating, sortByRating, sortByDate}) =>
  <div className='results-display'>
    <FilterSettings sortByRating={sortByRating} sortByDate={sortByDate} />
    <FavoriteResults list={list} />
  </div>

const FilterSettings = ({sortByRating, sortByDate}) =>
  <div className="filter-settings row">
    <span 
      className='col s2'
      style={{ padding: '1%'}}
    > 
      <button onClick={sortByRating} >Highest Rated</button>
    </span>
    <span 
      className='col s2'
      style={{ padding: '1%'}}
    > 
      <button onClick={sortByDate} >Newest First</button>
    </span>
  </div>

const FavoriteResults = ({ list }) =>
  <div className="favorite-results">
    { list.map(item =>
      <div key={item.objectID} className="result-row row"> 
        <a
          className='col s4' 
          style={{ padding: '1%'}} 
          href={'http://'+item.url}
          target="_blank"
        >
          {item.title}
        </a>
        <StarRatingComponent 
          style={{ padding: '1%'}}
          className='stars col s4'
          name={"rate" + item.objectID}
          starCount={5}
          value={item.rating}
          editing={false}
        />
{
        // <span style={{ width: '10%'}}>
        //   {
        //     item.date.getDate() + '-' + (item.date.getMonth() + 1) + '-' + item.date.getFullYear()
        //   }
        // </span>
}
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
    this.onStarClick = this.onStarClick.bind(this);
    this.sortByRating = this.sortByRating.bind(this);
    this.sortByDate = this.sortByDate.bind(this);
  }

  handleSubmit(url) {
    //todo: validation
    const list = this.state.list;
    const updatedList = [...list, {
      title: url,
      url: url,
      rating: this.state.rating,
      tags: [],
      objectID: list.length,
      date: new Date(),
    }]
    this.setState( {list: updatedList} )
    //reset state
  }

  handleChange(event) {
    this.setState({
      submissionText: event.target.value,
    })
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }

  sortByRating(){
    const sortedFavorites = this.state.list.sort(function(a, b) {
      return parseFloat(b.rating) - parseFloat(a.rating);
    });
    this.setState({favorites: sortedFavorites})
  }
  
  sortByDate(){
    const sortedFavorites = this.state.list.sort(function(a,b){
      return new Date(b.date) - new Date(a.date);
    });
    this.setState({date: sortedFavorites})
  }


  render() {
    const { list, submissionText, rating } = this.state;
    return (
      <div id="page-wrap">
        <h1 className="test">
          Submit A New Favorite
        </h1>
        <SubmitFavorite 
          favorite={submissionText} 
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          onStarClick={this.onStarClick}
        />
        <ResultsDisplay 
          list={list}
          submissionText={submissionText}
          rating={rating}
          sortByRating={this.sortByRating}
          sortByDate={this.sortByDate}
        />
      </div>
    );
  }
}

export default App;
