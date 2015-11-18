import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import {search} from '../utils/levenshtein';

class AutocompleteTextField extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      results: [],
      selectedIndex: -1,
      showResults: false,
      value: null
    };

    // Bind event handlers.
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeydown = this.onKeydown.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onSelect = this.onSelect.bind(this);

    this.clear = this.clear.bind(this);
  }

  // Hide autocomplete results on blur.
  onBlur() {
    this.setState({ showResults: false });
  }

  // Recompute autocomplete matches.
  onChange(e) {
    const results = search(e.target.value, this.props.dictionary);
    const minIndex = results.min ? results.min.index : -1;

    this.setState({
      results: results.words,
      selectedIndex: minIndex, // Deselect any selected result field
      showResults: !!e.target.value, // Hide results menu on empty input
      value: e.target.value
    });

    // send callback to parent component
    if (this.props.onChange) {
      this.props.onChange(e.target.value);
    }
  }

  // Key commands for more natural flow through the menu.
  onKeydown(e) {
    switch(e.keyCode) {
      // Enter
      case 13:
        e.preventDefault();
        if (this.state.selectedIndex >= 0) {
          this.onSelect(this.state.results[this.state.selectedIndex]);
        } else {
          this.onSelect(this.state.value);
        }
        break;
      // Escape
      case 27:
        this.input().blur();
        break;
      // Up
      case 38:
        const prevIndex = this.state.selectedIndex - 1;
        this.setState({ selectedIndex: Math.max(prevIndex, -1) });
        break;
      // Down
      case 40:
        const nextIndex = this.state.selectedIndex + 1;
        const maxIndex = this.state.results.length - 1;
        this.setState({ selectedIndex: Math.min(nextIndex, maxIndex) });
        break;
      default:
        break;
    }
  }

  // Highlight result on hover.
  onMouseEnter(index) {
    this.setState({ selectedIndex: index });
  }

  // Set the input value to that of the selected entry.
  onSelect(entry) {
    // Prevent the results menu from disappearing.
    this.input().focus();

    this.setState({
      selectedIndex: -1,
      showResults: false,
      value: entry
    });

    // send callback to parent component
    if (this.props.onSelect) {
      this.props.onSelect(entry);
    }
  }

  // Clears the input field.
  clear() {
    const input = this.input();
    input.value = '';
    input.focus();
    this.setState({ value: null });

    if (this.props.onClear) {
      this.props.onClear();
    }
  }

  // Returns a reference to the native DOM node of the input field.
  input() {
    return ReactDOM.findDOMNode(this.refs.input);
  }

  render() {
    const inputClass = cx({ invalid:this.props.invalid }, this.props.className);
    const closeIconClass = cx('ion-close-circled', { hidden: !this.state.value });

    return (
      <div className="autocomplete-container">
        <input
          autoComplete="off"
          className={inputClass}
          onBlur={this.onBlur}
          onChange={this.onChange}
          onKeyDown={this.onKeydown}
          placeholder={this.props.placeholder}
          ref="input"
          type="text"
          value={this.state.value}
        />

        <a>
          <i className={closeIconClass} onClick={this.clear} />
        </a>

        <ul className={cx({ hide: !this.state.showResults })}>
          {this.state.results.map((entry, index) => {
            return (
              <li
                key = {entry}
                className={cx({ 'selected': this.state.selectedIndex === index })}
                onMouseDown={this.onSelect.bind(this, entry)}
                onMouseEnter={this.onMouseEnter.bind(this, index)}
              >
                {entry}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

AutocompleteTextField.propTypes = {
  dictionary: React.PropTypes.array.isRequired,
  className: React.PropTypes.string,
  invalid: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  onSelect: React.PropTypes.func,
  onClear: React.PropTypes.func,
  placeholder: React.PropTypes.string
}

AutocompleteTextField.defaultProps = {
  invalid: false
}

export default AutocompleteTextField;
