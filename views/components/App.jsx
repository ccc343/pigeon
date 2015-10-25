import React from 'react';

import Header from './Header';
import SubHeader from './SubHeader';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <SubHeader />
        {this.props.children}
      </div>
    );
  }
}

export default App;
