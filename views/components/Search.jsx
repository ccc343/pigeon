import React from 'react';
import ReactDOM from 'react-dom';
import AutocompleteTextField from './AutocompleteTextField';

import cx from 'classnames';

class Search extends React.Component {

  render() {
    return (
        <div className="text-light-grey">
          <i className="ion-search text-white" />
          <AutocompleteTextField
            className="bg-dark-grey"
            dictionary={['julia', 'likes', 'pie', 'very', 'much', 'yeaaah', 'cool']}
            placeholder="search tags and members..."
          />
        </div>
    );
  }
}

export default Search;
