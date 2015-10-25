import React from 'react';
import Search from './Search';
import Link from './Link';

import cx from 'classnames';

import connectToStores from 'alt/utils/connectToStores';
import store from '../routes/routeStore';

class SubHeader extends React.Component {

  static getStores() {
    return [store];
  }

  static getPropsFromStores() {
    return store.getState();
  }

  render() {
    return (
      <div className="row subheader text-center text-white">
        <div className="span6">
          <Search />
        </div>

        <Link
          className={cx('span3', 'tab', {'selected':this.props.path === "/tags"})}
          to="/tags"
        >
          <h3>Your tags</h3>
        </Link>

        <Link
          className={cx('span3', 'tab', {'selected':this.props.path === "/organization"})}
          to="/organization"
        >
          <h3>Your organization</h3>
        </Link>
      </div>
    );
  }
}

export default connectToStores(SubHeader);
