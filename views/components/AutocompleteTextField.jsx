import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import {search} from '../utils/levenshtein';

class AutocompleteTextField extends React.Component {

  constructor(props) {
    super(props);
    this.state = { hasValue: false };

    // Bind event handlers.
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.clear = this.clear.bind(this);
  }

  // Recompute autocomplete matches.
  onChange(e) {
    const value = e.target.value;
    this.setState({ hasValue: !!value });

    if (!value) {
      return this.props.onClear();
    }

    const results = search(value, this.props.dictionary);

    // Send the results of the change to the parent component.
    this.props.onChange(results.words);
  }

  // Key commands for more natural flow through the menu.
  onKeyDown(e) {
    if (e.keyCode === 27) {
      this.input().blur();
    }
  }

  // Clears the input field.
  clear() {
    const input = this.input();
    input.value = '';
    input.focus();

    this.setState({ hasValue: false });
    this.props.onClear();
  }

  // Returns a reference to the native DOM node of the input field.
  input() {
    return ReactDOM.findDOMNode(this.refs.input);
  }

  render() {
    const inputClass = cx({ invalid:this.props.invalid }, this.props.className);
    const closeIconClass = cx('ion-close-circled', { hidden: !this.state.hasValue });

    return (
      <div className="autocomplete-container">
        <input
          autoComplete="off"
          className={inputClass}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          placeholder={this.props.placeholder}
          ref="input"
          type="text"
        />

        <a>
          <i className={closeIconClass} onClick={this.clear} />
        </a>
      </div>
    );
  }
}

AutocompleteTextField.propTypes = {
  dictionary: React.PropTypes.array.isRequired,
  className: React.PropTypes.string,
  onChange: React.PropTypes.func,
  onClear: React.PropTypes.func,
  placeholder: React.PropTypes.string
}

export default AutocompleteTextField;
