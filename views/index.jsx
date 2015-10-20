import React from 'react';
import ReactDOM from 'react-dom';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Index';
  }

  render() {
    return (
      <div>I really like pie!</div>
    );
  }
}

ReactDOM.render(React.createElement(Index), document.getElementById('react-root'));
