import React from 'react';
import ReactDOM from 'react-dom';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Index';
  }

  render() {
    return (
      <div>
        <img src="public/logo.png" />
        <h1 className="text-red">Pigeon</h1>
      </div>
    );
  }
}

ReactDOM.render(React.createElement(Index), document.getElementById('react-root'));
