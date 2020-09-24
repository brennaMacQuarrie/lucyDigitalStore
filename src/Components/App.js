import React, { Component } from 'react';
import '../App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* {this is where i will import all the different parts of the site
        header
        items with map function
        cart
        footer} */}

        <header className="App-header">
          <p>
            STUFF ABOUT LUCY
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            WHAT
  
          </a>
        </header>
      </div>
    );
  }
}

export default App;
