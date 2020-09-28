import React from 'react';


const Item = (props) => {
  
    return (
      <div className="individualItem" value={props.type}>
        <div>
          <img src={props.image} alt={props.title}/>
        </div>
        
        <h3>{props.title}</h3>
        <p>Price: {props.price}</p>
        <button onClick={props.addToCart}>add to cart</button>
      </div>
    );
}

export default Item;
