import React, { Component } from 'react';
import images from './images';
import firebase from './firebase';
import Header from './Header';
import Item from './Item';
import ToggleDisplay from "react-toggle-display";
import Cart from './Cart';
import '../App.css';
import { getQueriesForElement } from '@testing-library/react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      priceTotal: 0,
      show: false,
      items: [],
    };
  }

  componentDidMount() {
    // Items population
    const dbRef = firebase.database().ref();
    dbRef.on("value", (response) => {

      const newState = [];
      const data = response.val();
      // gets into items array in my db
      const items = data.items;

      items.forEach((item) => {
        newState.push(item); 
      });

      this.setState({
        items: newState,
      });
    });

    //Cart
    const dbRefCart = firebase.database().ref('Cart');
    dbRefCart.on("value", (response) => {

      const newCart = [];
      const data = response.val();

      for (let key in data) {
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
        cart: newCart,
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
      let sumTotal = this.state.cart.map((item) => {
        return item.price;
      })
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      
      let newTotal = 0;

      if (sumTotal.length > 0) {
        newTotal = sumTotal.reduce(reducer);
      } 
      this.setState({
        priceTotal: newTotal,
      })      
  }



  removeFromCart = (itemTobeRemoved) => {
    const dbRef = firebase.database().ref('Cart');
    dbRef.child(itemTobeRemoved).remove();
  }


  render() {
    const copyright = '\u00A9'; 
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
            <button onClick={() => this.handleCart()} className="cartShowIcon">
              <i className="fa fa-shopping-cart"></i>
            </button>

            <ToggleDisplay className="cart" show={this.state.show}>
              <h2>Your Cart</h2>
              {this.state.cart.length > 0 ? (
                <div className="cartContainer">
                  {this.state.cart.map((cartItem) => {
                    return (
                      <Cart
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
                  <div className="priceTotal">
                    <h4>Total:</h4>
                    <h5>${this.state.priceTotal}</h5>
                  </div>
                </div>
              ) : null}
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



