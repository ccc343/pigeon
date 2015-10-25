import React from 'react';
import Search from './Search';
import Link from './Link';

import cx from 'classnames';

import connectToStores from 'alt/utils/connectToStores';
import actions from '../routes/routeActions';
import store from '../routes/routeStore';

class SubHeader extends React.Component {

  static getStores() {
    return [store];
  }

  static getPropsFromStores() {
    return store.getState();
  }

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(path) {
    actions.go(path);
  }

  render() {
    return (
      <div className="row subheader text-center text-white">
        <div className="span6">
          <Search />
        </div>

          <div className={cx('span3', 'tab', {'selected':this.props.path === "/tags"})}>
            <Link to="/tags">
              <h3>Your tags</h3>
            </Link>
          </div>

          <div className={cx('span3', 'tab', {'selected':this.props.path === "/organization"})}>
            <Link to="/organization">
              <h3>Your organization</h3>
            </Link>
          </div>
      </div>
    );
  }
}

export default connectToStores(SubHeader);
