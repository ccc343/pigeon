import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      empty: true
    };

    this.onChange = this.onChange.bind(this);
    this.clear = this.clear.bind(this);
  }

  onChange(e) {
    this.setState({empty: !e.target.value});
  }

  clear() {
    const input = ReactDOM.findDOMNode(this.refs.input);
    input.value = "";
    input.focus();
    this.setState({empty: true});
  }

  render() {
    return (
        <div className="text-light-grey input-container">
          <i className="ion-search" />
          <input
            className="bg-dark-grey"
            type="text"
            placeholder="search tags and members..."
            autoComplete="off"
            onChange={this.onChange}
            ref="input"
          />
          <a>
            <i
              className={cx('ion-close-circled', {hidden: this.state.empty})}
              onClick={this.clear}
            />
          </a>
        </div>
    );
  }
}

export default Search;
