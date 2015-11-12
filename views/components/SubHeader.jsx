import React from 'react';
import Search from './Search';

import cx from 'classnames';

class SubHeader extends React.Component {

  render() {
    return (
      <div className="row subheader text-center text-white">
        <div className="span6">
          <Search />
        </div>

        <div className={cx('span3', 'tab', {'selected': true})}>
          <h3>Your tags</h3>
        </div>

        <div className={cx('span3', 'tab', {'selected': false})}>
          <h3>Your organization</h3>
        </div>
      </div>
    );
  }
}

export default SubHeader;
