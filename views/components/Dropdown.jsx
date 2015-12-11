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
  }

  toggle() {
    this.setState({ showOptions: !this.state.showOptions });
  }

  render() {
    return (
      <div className="row">
        <div className="select-wrapper">
          <span className="select-label">{this.props.label}</span>
          <ul className="select">
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
      </div>
    );
  }
}

export default Dropdown;
