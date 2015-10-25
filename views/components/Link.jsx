import React from 'react';
import actions from '../routes/routeActions';

class Link extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    actions.go(this.props.to);
  }

  render() {
    return (
      <div className={this.props.className} onClick={this.onClick}>
        {this.props.children}
      </div>
    );
  }
}

Link.propTypes = {
  to: React.PropTypes.string.isRequired,
  className: React.PropTypes.string
};

export default Link;
