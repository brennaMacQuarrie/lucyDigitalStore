import React from 'react';

const Item = (props) => {
    return (
      <div className="itemSection">
        <h2>View By</h2>
        <ul className="viewOptions">
          <li>
            <button>Paintings</button>
          </li>
          <li>
            <button>All</button>
          </li>
          <li>
            <button>Jewelry</button>
          </li>
        </ul>

        <main>
          <div className="individualItem">
            <div>
              <p>this is the image okay</p>
            </div>
            <p>item title</p>
            <p>item cost</p>
            <button>add to cart</button>
          </div>

          <div className="individualItem">
            <div>
              <p>this is the image okay</p>
            </div>
            <p>item title</p>
            <p>item cost</p>
            <button>add to cart</button>
          </div>
          <div className="individualItem">
            <div>
              <p>this is the image okay</p>
            </div>
            <p>item title</p>
            <p>item cost</p>
            <button>add to cart</button>
          </div>
        </main>
      </div>
    );
}

export default Item;