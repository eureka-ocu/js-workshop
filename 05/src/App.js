import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };
  }

  componentWillMount() {
    this.setState({
      isLoading: true,
    });
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 1000);
  }

  render() {
    const { color } = this.props;
    const { isLoading } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {
            isLoading
              ? <h2>Loading</h2>
              : <h2>Welcome to React</h2>
          }
        </div>
        <p style={{ color }} className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
