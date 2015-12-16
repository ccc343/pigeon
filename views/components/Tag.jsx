import React from 'react';
import cx from 'classnames';
import uiActions from '../actions/uiActions';

class Tag extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      hover: false
    };

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onMouseEnter() {
    this.setState({ hover: true });
  }

  onMouseLeave() {
    this.setState({ hover: false });
  }

  onClick() {
    uiActions.showTag(this.props.tag);
  }

  render() {
    const overlay = this.state.hover ? (
      <div className="overlay">
        <i className="ion-star text-dark-grey" />
      </div>
    ) : null;

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
