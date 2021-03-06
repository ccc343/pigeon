import React from 'react';
import cx from 'classnames';
import uiActions from '../actions/uiActions';
import uiStore from '../stores/uiStore';

class Tag extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    uiActions.showTag(this.props.tag);
  }

  render() {
    return (
      <li
        className={cx('tag', {
          'subscribed': this.props.tag.subscribed
        })}
        onClick={this.onClick}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        #{this.props.tag.name}
      </li>
    );
  }
}

Tag.propTypes = {
  tag: React.PropTypes.object.isRequired
};

export default Tag;
