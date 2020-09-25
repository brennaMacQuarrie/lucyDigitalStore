import React, { Component } from 'react';
import firebase from "./firebase";
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

    // this should be a function to change the state of the cartView, toggling between visible and non visible
  cartView = (visible) => {
    const newState = visible;
    this.setState({
      cartView: newState,
    })
  }


  render() {
    return (
      <div className="App">
        {/* {this is where i will import all the different parts of the site
        header
        items with map function
        cart
        footer} */}
        <nav>
          <div className="cartDiv">
            <button className="cartShowIcon">
              <i class="fa fa-shopping-cart"></i>
            </button>
          </div>
        </nav>
        <Header />
        <Item />
        {/* <Cart /> */}
        <Footer />
      </div>
    );
  }
}

export default App;
