import React from 'react';

const Item = (props) => {
    return (
        <div className="itemSection">
            <h2>View By</h2>
            <ul className="viewOptions">
                <li><button>Paintings</button></li>
                <li><button>All</button></li>
                <li><button>Jewelry</button></li>
            </ul>
            <div className="individualItem">
                <p>item title</p>
                <p>item cost</p>
                <button>add to cart</button>
            </div>
        </div>
    );
}

export default Item;