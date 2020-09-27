import React from 'react';
import firebase from './firebase';

class Cart extends React.Component {

    render() {
        return (
            <div className="fakeItem">
                <img src={this.props.imgRef} alt="green mala." />
                <div>
                    <h4>ItemName</h4>
                    <p>price</p>
                </div>
                <button onClick={this.props.cartRemove}>
                    <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
            </div>
        );
    }
}

export default Cart;

