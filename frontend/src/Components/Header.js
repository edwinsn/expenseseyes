import React from 'react'
import '../assets/css/header.css'
import logOutIcon from '../assets/images/logOut.svg'

const Header=({handleLogout, email})=>{
    return (
        
        <header className="header">
            <p className="appIcon">icono</p>
            <span className="container">
                <p>{email}</p>
                    <img src={logOutIcon} className="logOutBtn" onClick={handleLogout} alt="Salir"/>
            </span>
        </header>

    )}

export default Header