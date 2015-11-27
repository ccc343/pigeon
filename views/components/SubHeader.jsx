import React from 'react';
import cx from 'classnames';
import Search from './Search';
import {getPath, Link} from '../router/router';

class SubHeader extends React.Component {

  render() {
    const path = getPath();

    return (
      <div className="row subheader text-center">
        <div className="span9">
          <Search />
        </div>

        <Link
          to='/tags'
          className={cx('span3 phone-hidden tab', {'selected': path === '/tags'})}
        >
          <h3>your tags</h3>
        </Link>
      </div>
    );
  }
}

export default SubHeader;
