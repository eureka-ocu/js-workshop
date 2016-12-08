import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

class MainSection extends Component {
  constructor() {
    super();
    this.state = {
      toggle: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.stopPropagation();
    const { toggle } = this.state;
    this.setState({
      toggle: !toggle,
    });
  }

  render() {
    const { color } = this.props;
    const { toggle } = this.state;
    const style = toggle
      ? { color: color }
      : { color: "black" };
    return (
      <div>
        <h2 style={style}>くそお世話になりました！！！！</h2>
        <button onClick={this.handleClick}>click here</button>
      </div>
    );
  }
}

// http://example.com/colors
const response = [
  'red',
  'blue',
  'green',
  'yellow',
  'purple',
];

const Root = (props) => {
  const { colors } = props;
  return (
    <div>
      {
        colors.map(color => <MainSection color={color} />)
      }
    </div>
  );
}

ReactDOM.render(
  <Root colors={response} />,
  document.getElementById('root')
);
