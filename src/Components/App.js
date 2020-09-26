import React, { Component } from 'react';
import firebase from './firebase';
import Header from './Header';
import Item from './Item';
import ToggleDisplay from "react-toggle-display";
import Cart from './Cart';
import Footer from './Footer';
import '../App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      show: false,
      items: [],
    };
  }

  componentDidMount() {
    const dbRef = firebase.database().ref();
    dbRef.on("value", (response) => {

      // building a new array for the items (cart???) in my app state
      const newState = [];
      const data = response.val();
      const items = data.items;
      items.forEach((item) => {
        newState.push(item); // this works
      });

      this.setState({
        items: newState,
      });
    });
  }

  // this should be a function to change the state of the cartView, toggling between visible and non visible
  handleCart = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  handleJewelry = () => {
      const dbRef = firebase.database().ref();
      dbRef.on("value", (response) => {
      // building a jewelry array
      const jewelryArray = [];
      const data = response.val();
      
      const items = data.items;
      // array of objects      
      items.forEach((item) => {
        if (item.type == "jewelry") {
          jewelryArray.push(item); // this works
        }
      });

      this.setState({
        items: jewelryArray,
      });
    });
  }


  handlePaintings = () => {
    // i want to alter items in state
    const dbRef = firebase.database().ref();
    dbRef.on("value", (response) => {
      // building a jewelry array
      const paintingsArray = [];
      const data = response.val();

      const items = data.items;
      // array of objects

      items.forEach((item) => {
        if (item.type == "painting") {
          paintingsArray.push(item); // this works
        }
      });

      this.setState({
        items: paintingsArray,
      });
    });
  }


  handleAll = () => {
    // i want to alter items in state
    const dbRef = firebase.database().ref();
    dbRef.on("value", (response) => {
      // building a new array for the items (cart???) in my app state
      const newState = [];
      const data = response.val();
      const items = data.items;
      items.forEach((item) => {
        newState.push(item); // this works
      });

      this.setState({
        items: newState,
      });
    });
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
            <button
              onClick={() => this.handleCart()}
              className="cartShowIcon"
            >
              <i className="fa fa-shopping-cart"></i>
            </button>
          <ToggleDisplay className="cart" show={this.state.show}>
            <h2>Your Cart</h2>
            <Cart />
          </ToggleDisplay>
          </div>
        </nav>

        <Header />

        <main className="wrapper">
          <h2>View By</h2>
          <ul className="viewOptions">
            <li>
              <button onClick={this.handlePaintings}>Paintings</button>
            </li>
            <li>
              <button onClick={this.handleAll}>All</button>
            </li>
            <li>
              <button onClick={this.handleJewelry}>Jewelry</button>
            </li>
          </ul>

          <div className="mainDisplay">
            {this.state.items.map((item) => {
              return (
                <Item
                  key={item.id}
                  imageRef={item.imageRef}
                  title={item.name}
                  price={item.price}
                  type={item.type}
                />
              );
            })}
          </div>
        </main>

        <Footer />
      </div>
    );
  }
}

export default App;
