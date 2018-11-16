import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import queryString from 'querystring';
import { withRouter, Link } from 'react-router-dom';
import { getArtists } from '../../services/musicSearch';
import { ROUTES } from '../../routes/routes';
import Artist from '../artist/Artist';

class Search extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  state = {
    page: 1,
    totalPages: null,
    artists: []
  };

  doSearch = () => {
    const { searchTerm } = queryString.parse(this.props.location.search.slice(1));
    if(!searchTerm) return;

    getArtists(searchTerm)
      .then(({ pages, artists }) => this.setState({ artists }));
  };

  componentDidMount() {
    this.doSearch();
  };

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.location.search !== this.props.location.search) {
      this.doSearch();
    }
  };

  updateSearchTerm = event => {
    event.preventDefault();
    const searchTerm = document.getElementById('searchTerm').value;
    const searchQuery = queryString.stringify({ searchTerm });
    this.props.history.push({           /* <=====TODO: ASK RYAN WHAT'S GOING ON HERE */
      pathName: ROUTES.SEARCH.path,     /* <=====TODO: ASK RYAN WHAT'S GOING ON HERE */
      search: searchQuery               /* <=====TODO: ASK RYAN WHAT'S GOING ON HERE */
    });
  };

  render() {
    const artists = this.state.artists.map(artist => {
      return (
        <li key={artist.id}>
          <Artist
            id={artist.id}
            name={artist.name}
            description={artist.description}
          />
        </li>
      );
    });

    return (
      <Fragment>
        <form onSubmit={this.updateSearchTerm}>
          <input id="searchTerm" type="text"/>
          <button>Search!</button>
        </form>

        <ul>
          {artists}
        </ul>
      </Fragment>
    )
  }

}

export default withRouter(Search);