import React from 'react';
import cx from 'classnames';

class Tag extends React.Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.show(this.props.tag);
  }

  render() {
    return (
      <li
        className={cx('tag', { selected: this.props.subscribed })}
        onClick={this.onClick}
      >
        #{this.props.tag.name}
      </li>
    );
  }
}

Tag.propTypes = {
  tag: React.PropTypes.object.isRequired,
  show: React.PropTypes.func.isRequired
};

export default Tag;
