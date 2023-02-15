import React from "react";
import { useContext } from 'react';
import AuthContext from "../../components/context/authprovider";
import './header.css';

function Header() {
    const { auth } = useContext(AuthContext);
    return (
        <div className="headerWrapper">
            <div className='content'>
                <a className="header--button-parking" href="/">super parking</a>
                {auth.role === "client" || auth.role === "administrator" ? <><div className="header--personal"> <a className="header--button-username" href="/">{auth.user}</a></div> <a href="/sign_in" className="header--button-logout">log out</a> </> : <div className="sign-split"><a className="header--button-username" href="/sign_up">sign up</a> / <a className="header--button-username" href="/sign_in">log in</a></div>}
            </div>
        </div>
    )
};

export default Header;