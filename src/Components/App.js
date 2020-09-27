import React, { Component } from 'react';
import firebase from './firebase';
import Header from './Header';
import Item from './Item';
import ToggleDisplay from "react-toggle-display";
import Cart from './Cart';
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

  addToCart = () => {
    // do the thing with the cart
    console.log('add to cart');
    // setState on cart to push item clicked

  }

  render() {
    return (
      <div className="App">

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

        <div className="blogContainer">
          <div className="gradient">
            <div className="blogLink">
              <a href="https://friends4trees4life.com/">Blog</a>
            </div>
          </div>
        </div>

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
                  image={item.imageRef}
                  title={item.name}
                  price={item.price}
                  type={item.type}
                  cart={this.addToCart}
                  // addToCart will be the function
                  
                />
              );
            })}
          </div>
        </main>

        <footer>
          {/* <img src="/assets/braceletMagnesite.jpeg" alt=""/> */}
          <p>created at Juno College by <a href="https://brennamacquarrie.dev">Brenna MacQuarrie</a></p>
        </footer>
      </div>
    );
  }
}

export default App;



{/* {this.state.cart.map((cart) => {
                return ( */}
{/* <Item
                    key={cart.id}
                    imageRef={cart.imageRef}
                    title={cart.name}
                    price={cart.price}
                    type={cart.type}
                  /> */}
{/* )
              })
            }
           */}