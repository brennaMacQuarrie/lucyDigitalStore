import React from 'react';
// import firebase from './firebase';

const Cart = (props) => {
    return (
        <div className="fakeItem">
            <img src={props.image} alt={props.title} />
            
            <div>
                <h4>{props.title}</h4>
                <p>Price: ${props.price}</p>
            </div>

            <button onClick={props.cartRemove}>
                <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
        </div>
    );
}

export default Cart;

