import React from 'react';

import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import Tags from '../pages/Tags';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tab: 'tags'
    };
  }

  render() {
    return (
      <div>
        <Header />
        <SubHeader />
        {this.state.tab === 'tags' ? <Tags /> : <Organization />}
      </div>
    );
  }
}

export default App;
