import React, { Component } from 'react';
import firebase from './firebase';
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
    };
  }

  componentDidMount() {
    const dbRef = firebase.database().ref();
    dbRef.on("value", (response) => {

      // building a new array for the items in my app state
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
  cartView = () => {
    
  };




  handleJewelry = () => {
    // i want to alter items in state
    // if dbRef.data.items.item.type == jewelry
    const jewelryItems = [];

    const itemsArray = firebase.database().ref("items");
    // this is an object, has items array, with nested item objects
    console.log(itemsArray);


    this.setState({
      items: jewelryItems,
    });
  }


  handlePaintings = () => {
    // i want to alter items in state
  }
  handleAll = () => {
    // i want to alter items in state
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
            <button className="cartShowIcon" onClick={this.cartView}>
              <i className="fa fa-shopping-cart"></i>
            </button>
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

        <Cart />
        <Footer />
      </div>
    );
  }
}

export default App;
