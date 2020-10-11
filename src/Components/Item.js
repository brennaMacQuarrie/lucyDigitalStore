import React from 'react';


const Item = (props) => {
  
    return (
      <div className="individualItem" value={props.type}>
        <div>
          <img src={props.image} alt={props.title}/>
        </div>
        
          <h2>{props.title}</h2>

        <p>Price: ${props.price}.00</p>
        <button onClick={props.addToCart}>add to cart</button>
      </div>
    );
}

export default Item;


