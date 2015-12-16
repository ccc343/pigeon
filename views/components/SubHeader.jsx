import React from 'react';
import Sticky from 'react-sticky';
import Search from './Search';
import Dropdown from './Dropdown';

import cx from 'classnames';

import tagsActions from '../actions/tagsActions';
import {sorts, filters} from '../utils/sort';

class SubHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sticky: false
    };

    this.sortOptions = Object.keys(sorts);
    this.filterOptions = Object.keys(filters);

    this.handleStickyStateChange = this.handleStickyStateChange.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleStickyStateChange(e) {
    this.setState({ sticky: e });
  }

  handleSort(i) {
    tagsActions.setSort(this.sortOptions[i]);
  }

  handleFilter(i) {
    tagsActions.setFilter(this.filterOptions[i]);
  }

  render() {
    return (
      <div>
        <Sticky onStickyStateChange={this.handleStickyStateChange}>
          <div className="row subheader">
            <div className="span4 tab text-center">
              <Search />
            </div>
            <div className="span4 tab">
              <Dropdown
                label="Sort by"
                options={this.sortOptions}
                onSelect={this.handleSort}
              />
            </div>
            <div className="span4 tab" id="filter">
              <Dropdown
                label="Filter by"
                options={this.filterOptions}
                onSelect={this.handleFilter}
              />
            </div>
          </div>
        </Sticky>

        {/* Prevents content from jumping on sticky state change. */}
        {this.state.sticky ? <div className="subheader-placeholder" /> : null}
      </div>
    );
  }
}

export default SubHeader;
