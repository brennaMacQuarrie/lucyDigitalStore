import React from 'react';
// import firebase from './firebase';

const Cart = (props) => {
    return (
        <div className="fakeItem" tabIndex={0}>
            <img src={props.image} alt={props.title} />
            
            <div>
                <h3>{props.title}</h3>
                <p>Price: ${props.price}</p>
            </div>

            <button aria-label="remove this item to your cart" onClick={props.cartRemove}>
                <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
        </div>
    );
}

export default Cart;

