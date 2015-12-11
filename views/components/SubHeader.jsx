import React from 'react';
import Sticky from 'react-sticky';
import cx from 'classnames';
import Search from './Search';

class SubHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sticky: false
    };

    this.handleStickyStateChange = this.handleStickyStateChange.bind(this);
  }

  handleStickyStateChange(e) {
    this.setState({ sticky: e });
  }

  render() {
    return (
      <div>
        <Sticky onStickyStateChange={this.handleStickyStateChange}>
          <div className="row subheader text-center">
            <div className="span12">
              <Search />
            </div>
          </div>
        </Sticky>

        {/* Prevents content from jumping on sticky state change. */}
        {this.state.sticky ? <div className="subheader-placeholder" /> : null}
      </div>
    );
  }
}

export default SubHeader;
