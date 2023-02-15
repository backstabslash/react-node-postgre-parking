import React from "react";
import { useContext } from 'react';
import AuthContext from "../../components/context/authprovider";
import './header.css';

function Header() {
    const { auth } = useContext(AuthContext);
    return (
        <div className="headerWrapper">
            <div className='content'>
                super parking
                {auth.role === "client" ? <div> <i className="fa-solid fa-user-tie"></i> hi, {auth.user} </div> : ""}
                <a href="/sign_up">sign up</a>
                <a href="/sign_in">log in</a>
            </div>
        </div>
    )
};

export default Header;