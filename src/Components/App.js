import React, { Component } from 'react';
import images from './images';
import firebase from './firebase';
import Header from './Header';
import Item from './Item';
import ToggleDisplay from "react-toggle-display";
import Cart from './Cart';
import '../App.css';
// import { getQueriesForElement } from '@testing-library/react';


// class component for app.js
class App extends Component {
  // constructor to set initial state
  constructor() {
    super();
    this.state = {
      // to hold info passed into our cart
      cart: [],
      // to hold price in cart
      priceTotal: 0,
      // to hold boolean if cart is open or closed
      show: false,
      // to access items from firebase json file and show on page
      items: [],
    };
  }

  // didMount, where we make data requests for use 
  componentDidMount() {
    // Items population
    // open firebase portal! store the stuff in it here
    const dbRef = firebase.database().ref();
    // snapshot of the dbref gives us what's in here
    dbRef.on("value", (response) => {
      // new array so we don't modify state
      const newState = [];
      // this is the response we get from db
      const data = response.val();
      // gets into that response and reaches the 'items' obj i have built with json
      const items = data.items;

      // for each item in that object, drop it into the above array instead.
      items.forEach((item) => {
        newState.push(item); 
      });
      // now make my items from state, the same as that new array
      this.setState({ 
        items: newState,
      });
    });

    //Cart
    const dbRefCart = firebase.database().ref('Cart');
    dbRefCart.on("value", (response) => {

      const newCart = [];
      const data = response.val();
      // for each key in the new Cart data object, 
      for (let key in data) {
        // push an object that looks like this into the newCart array
        newCart.push({
          key: key,
          id: data[key].id,
          imageRef: data[key].imageRef,
          price: data[key].price,
          name: data[key].name,
          type: data[key].type,
        })
      }
      
      this.setState({
        // this is an array of those exact objects using info from the original Cart obj
        cart: newCart,
        // once the cart has been altered, run the priceTotal func
      }, this.priceTotal);
    });
  }

  // function to change the state of the cartView
  handleCart = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  //IMAGE DISPLAY
  displayImages = (imageID) => {
    // imageID - 1 is because my images all have an id but they're 1-indexed
    return images[imageID - 1].url;
  }

  // 3 functions to show only specific items based on TYPE
  handleJewelry = () => {
      const dbRef = firebase.database().ref();
      dbRef.on("value", (response) => {
      // building a jewelry array
      const jewelryArray = [];
      const data = response.val();
      const items = data.items;
      items.forEach((item) => {
        // filtering for 'jewelry' items
        if (item.type == "jewelry") {
          jewelryArray.push(item); 
        }
      });

      this.setState({
        items: jewelryArray,
      });
    });
  }

  handlePaintings = () => {
    const dbRef = firebase.database().ref();
    dbRef.on("value", (response) => {
      // building a paintings array
      const paintingsArray = [];
      const data = response.val();
      const items = data.items;
      items.forEach((item) => {
        if (item.type == "painting") {
          paintingsArray.push(item); 
        }
      });

      this.setState({
        items: paintingsArray,
      });
    });
  }

  handleAll = () => {
    const dbRef = firebase.database().ref();
    dbRef.on("value", (response) => {
      // revert to original db population
      const newState = [];
      const data = response.val();
      const items = data.items;
      items.forEach((item) => {
        newState.push(item); 
      });

      this.setState({
        items: newState,
      });
    });
  }


  // two button click handlers that dymanically alter Cart in db
  addToCart = (itemToAdd) => {
    const dbRef = firebase.database().ref('Cart');
    dbRef.push(itemToAdd);
    // this is the item object with no key
  }
    
  priceTotal = () => {
      // this variable is to hold a new array that is full of the price of each item in the cart array, once the cart array has been set
      let sumTotal = this.state.cart.map((item) => {
        return item.price;
      })
      // math! this is a function that returns the sum of two nums
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      // placeholder value
      let newTotal = 0;
      // if there's stuff in that array from sumTotal
      if (sumTotal.length > 0) {
        // make the placeholder now equal the sum of those numbers
        newTotal = sumTotal.reduce(reducer);
      } 
      // now set that number to my state 
      this.setState({
        priceTotal: newTotal,
      })      
  }

  removeFromCart = (itemTobeRemoved) => {
    const dbRef = firebase.database().ref('Cart');
    // the friggin remove function, heccin yes
    dbRef.child(itemTobeRemoved).remove();
  }


  render() {
    const copyright = '\u00A9'; 
    // this is where we determine what is displayed to the DOM
    return (
      <div className="App">
        <nav>
          <div className="blogContainer">
            <div className="gradient">
              <div className="blogLink">
                <a href="https://friends4trees4life.com/">Blog</a>
              </div>
            </div>
          </div>

          <div className="cartDiv">

            <button aria-label="open or close your cart" onClick={() => this.handleCart()} className="cartShowIcon">
              <i className="fa fa-shopping-cart"></i>
            </button>

            <ToggleDisplay className="cart" show={this.state.show}>
              <button aria-label="open or close your cart" onClick={() => this.handleCart()} className="cartShowIcon">
                <i className="fa fa-shopping-cart"></i>
              </button>
              <h2>Your Cart</h2>
              

              {this.state.cart.length > 0 ? (
                <div>
                  {this.state.cart.map((cartItem) => {
                    return (
                      <Cart
                      // cart props so it knows what it's using from above functions
                        key={cartItem.key}
                        image={this.displayImages(cartItem.id)}
                        title={cartItem.name}
                        price={cartItem.price}
                        type={cartItem.type}
                        cartRemove={() => {
                          this.removeFromCart(cartItem.key);
                        }}
                      />
                    );
                  })}
                </div>
              ) : null}
            <div className="priceTotal">
              <h4>Total:</h4>
              <h5>${this.state.priceTotal}</h5>
            </div>
            </ToggleDisplay>
          </div>
        </nav>

        <Header />

        <main className="wrapper">
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
                <div className="item" key={item.id}>
                  <Item
                    key={item.key}
                    image={this.displayImages(item.id)}
                    title={item.name}
                    price={item.price}
                    type={item.type}
                    addToCart={() => {
                      this.addToCart(item);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </main>

        <footer>
          <p>
            <img src="" alt="" />
            {copyright} Juno College by{" "}
            <a href="https://brennamacquarrie.dev">Brenna MacQuarrie</a>
          </p>
        </footer>
      </div>
    );
  }
}

export default App;



