import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import difference from 'lodash.difference';

import LevenshteinTrie from '../utils/levenshteinTrie';

class AutocompleteTextField extends React.Component {

  constructor(props) {
    super(props);
    this.state = { hasValue: false };
    this.trie = new LevenshteinTrie(this.props.dictionary);

    // Bind event handlers.
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.clear = this.clear.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const diff = difference(nextProps.dictionary, this.props.dictionary);
    if (diff.length > 0) {
      diff.forEach(word => {
        this.trie.insert(word);
      });
    }

    return true;
  }

  // Recompute autocomplete matches.
  onChange(e) {
    const value = e.target.value;
    this.setState({ hasValue: !!value });

    if (!value) {
      return this.props.onClear();
    }

    const results = this.trie.search(value);

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

        <a className={cx({ hidden: !this.state.hasValue })}>
          <i className="ion-close-circled" onClick={this.clear} />
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
