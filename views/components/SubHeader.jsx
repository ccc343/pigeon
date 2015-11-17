import React from 'react';
import cx from 'classnames';
import Search from './Search';
import Link from '../router/components/Link';
import {getPath} from '../router/router';

class SubHeader extends React.Component {

  render() {
    const path = getPath();

    return (
      <div className="row subheader text-center text-white">
        <div className="span6">
          <Search />
        </div>

        <Link to='/tags' className={cx('span3 tab', {'selected': path === '/tags'})}>
          <h3>Your tags</h3>
        </Link>

        <Link to='/organization' className={cx('span3 tab', {'selected': path === '/organization'})}>
          <h3>Your organization</h3>
        </Link>
      </div>
    );
  }
}

export default SubHeader;
