import React from 'react'
import appIcon from '../assets/images/appIcon.svg'
import '../assets/css/header.css'
import logOutIcon from '../assets/images/logOut.svg'

const Header=({handleLogout, email})=>{
    return (

        <header className="header">
           <a href="#mainPage" className="appIconContainer">
            <img src={appIcon} alt="app Icon" className="appIcon"/>
           </a>
            <span className="container">
                <p className="email">{email}</p>
                    <img src={logOutIcon} className="logOutBtn" onClick={handleLogout} alt="Salir"/>
            </span>
        </header>

    )}

export default Header