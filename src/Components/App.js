import React, { Component } from 'react';
import Header from './Header';
import Item from './Item';
import Cart from './Cart';
import Footer from './Footer';
import '../App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      cartView: false,
      items: [],
    }
  }
  render() {
    return (
      <div className="App">
        {/* {this is where i will import all the different parts of the site
        header
        items with map function
        cart
        footer} */}
        <Header />
        <Item />
        <Cart />
        <Footer />
      </div>
    );
  }
}

export default App;
