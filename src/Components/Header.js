import React from 'react';


const Header = (props) => {
    return (
        <div className="header">
            {/* this prob has to go in the app.js render so it stays put??? sticky? */}
            {/* <nav>
                <div className="cartDiv">
                    <button className="cartShowIcon">
                    <i class="fa fa-shopping-cart"></i>
                    </button>
                </div>
            </nav> */}

            <div className="logoBox">
                <h1>L</h1>
            </div>
        </div>
    );
}

export default Header;