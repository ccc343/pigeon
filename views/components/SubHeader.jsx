import React from 'react';
import Sticky from 'react-sticky';
import Search from './Search';
import Dropdown from './Dropdown';

import cx from 'classnames';

import connectToStores from 'alt/utils/connectToStores';
import tagsActions from '../actions/tagsActions';
import tagsStore from '../stores/tagsStore';

class SubHeader extends React.Component {

  static getStores() {
    return [tagsStore];
  }

  static getPropsFromStores() {
    return tagsStore.getState();
  }

  constructor(props) {
    super(props);
    this.state = {
      sticky: false
    };

    this.handleStickyStateChange = this.handleStickyStateChange.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleStickyStateChange(e) {
    this.setState({ sticky: e });
  }

  handleSort(i) {
    tagsActions.setSort(i);
  }

  handleFilter(i) {
    tagsActions.setFilter(i);
  }

  render() {
    return (
      <div>
        <Sticky onStickyStateChange={this.handleStickyStateChange}>
          <div className="row subheader">
            <div className="span4 tab text-center">
              <Search />
            </div>
            <div className="span4 tab phone-hidden">
              <Dropdown
                label="Sort by"
                options={Object.keys(this.props.sorts)}
                onSelect={this.handleSort}
                selected={this.props.sorts['Relevance'] ? 3 : null}
              />
            </div>
            <div className="span4 tab phone-hidden" id="filter">
              <Dropdown
                label="Filter by"
                options={Object.keys(this.props.filters)}
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

export default connectToStores(SubHeader);
