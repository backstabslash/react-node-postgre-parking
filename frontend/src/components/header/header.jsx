import React from "react";
import './header.css';

function Header() {
    return (<div className="headerWrapper">
        <div className='helpDiv'>
            <i className="fa-solid fa-question" ></i>
        </div>
        <div className='titleDiv'>
            SUPER parking
        </div>
        <div className='persDiv'>
            <i className="fa-solid fa-ellipsis-vertical" ></i>
            <i className="fa-regular fa-chart-bar" ></i>
        </div>
    </div >
    )
};

export default Header;