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

      // const items = data.items;

      for (let key in data) {
        newCart.push({
          key: key,
          item: data[key].item,
        })
      }
      
      this.setState({
        cart: newCart,
      });
      console.log(this.state.cart);
    });
  }

  // function to change the state of the cartView
  handleCart = () => {
    this.setState({
      show: !this.state.show,
    });
  };

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
    console.log(itemToAdd);
    // this is the item object with no key
  }

  removeFromCart = (itemTobeRemoved) => {
    const dbRef = firebase.database().ref('Cart');
    dbRef.child(itemTobeRemoved).remove();
  }




  render() {
    console.log(this.state.cart);
    const copyright = '\u00A9'; 
    // this is AN item object with all undefined info
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
                  // this is also an object with all undefined info
                  console.log(cartItem);
                  return (
                    <Cart 
                      key={cartItem.id}
                      image={cartItem.imageRef}
                      title={cartItem.name}
                      price={cartItem.price}
                      type={cartItem.type}
                      cartRemove={() => {
                        this.removeFromCart(cartItem.key)
                      }
                    }
                    />
                  );
                })}
              </div>) : null}
            
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
                <div className="item">
                  <Item
                    key={item.key}
                    image={item.imageRef}
                    title={item.name}
                    price={item.price}
                    type={item.type}
                    addToCart={() => {
                      this.addToCart(item)
                      }
                    }
                  />
                  {/* <button onClick={() => {
                    this.addToCart(item)
                    }
                  }
                  >add to cart</button> */}

                </div>

              );
            })}
          </div>
        </main>

        <footer>
          {/* <img src="/assets/braceletMagnesite.jpeg" alt=""/> */}
          <p>{copyright} Juno College by <a href="https://brennamacquarrie.dev">Brenna MacQuarrie</a></p>
        </footer>
      </div>
    );
  }
}

export default App;



