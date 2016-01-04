import React from 'react';
import cx from 'classnames';

class Dropdown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      showOptions: false
    };

    this.onClick = this.onClick.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  onClick(index) {
    this.setState({
      selected: index,
      showOptions: false
    });

    this.props.onSelect(this.props.options[index]);
  }

  toggle() {
    this.setState({ showOptions: !this.state.showOptions });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.selected === 3 && this.state.selected !== 3) {
      this.setState({ selected: 3 });
    } else if (!nextProps.selected && this.state.selected === 3) {
      this.setState({ selected: 0 });
    }
    return true;
  }

  render() {
    return (
      <div className="select-wrapper">
        <h3 className="text-grey">{this.props.label}</h3>
        <ul>
          <li className="selected-option" onClick={this.toggle}>
            {this.props.options[this.state.selected]}
          </li>

          {this.state.showOptions ? (
            this.props.options.map((x, index) => {
              const c = cx("select-option", {
                selected: index === this.state.selected
              });
              return <li className={c} onClick={this.onClick.bind(this, index)} key={x}>{x}</li>;
            })
          ) : null}
        </ul>
      </div>
    );
  }
}

Dropdown.propTypes = {
  options: React.PropTypes.array.isRequired,
  label: React.PropTypes.string.isRequired,
  onSelect: React.PropTypes.func.isRequired
}

export default Dropdown;
