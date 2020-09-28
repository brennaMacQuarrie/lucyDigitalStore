import React from 'react';
import firebase from './firebase';

class Cart extends React.Component {
    // console.log(props);
    render() {
        return (
            <div className="fakeItem">
                <img src={this.props.imgRef} alt="green mala." />
                <div>
                    <h4>{this.props.title}</h4>
                    <p>{this.props.price}</p>
                </div>
                <button onClick={this.props.cartRemove}>
                    <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
            </div>
        );
    }
}

export default Cart;

