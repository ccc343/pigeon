import React from 'react';

import Header from './Header';
import SubHeader from './SubHeader';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header go={this.props.go} />
        <SubHeader go={this.props.go} path={this.props.path} />
        {this.props.children}
      </div>
    );
  }
}

export default App;
