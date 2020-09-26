import React from 'react';
// import * as Image from '../assets';

const Item = (props) => {
    return (
      <div className="individualItem" value={props.type}>
        <div>
          <img src={props.imgRef} alt={props.title}/>
        </div>
        
        <h3>{props.title}</h3>
        <p>{props.price}</p>
        <button>add to cart</button>
      </div>
    );
}

export default Item;
