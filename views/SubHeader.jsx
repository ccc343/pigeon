import React from 'react';
import cx from 'classnames';

import Search from './Search';

class SubHeader extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(path) {
    this.props.go(path);
  }

  render() {
    return (
      <div className="row subheader text-center text-white">
        <div className="span6">
          <Search />
        </div>
        <div
          className={cx('span3', 'tab', {'selected':this.props.path === "/tags"})}
          onClick={this.onClick.bind(this, '/tags')}
        >
          <h3>Your tags</h3>
        </div>
        <div
          className={cx('span3', 'tab', {'selected':this.props.path === "/organization"})}
          onClick={this.onClick.bind(this, '/organization')}
        >
          <h3>Your organization</h3>
        </div>
      </div>
    );
  }
}

export default SubHeader;
