import React from 'react';
// import * as Image from '../assets';


const Item = (props) => {
  
    return (
      <div className="individualItem" value={props.type}>
        <div>
          <img src={props.image} alt={props.title}/>
        </div>
        
        <h3>{props.title}</h3>
        <p>{props.price}</p>
        {/* // does this need an argument? */}
        <button onClick={props.addToCart}>add to cart</button>
      </div>
    );
}

export default Item;
// 