import React, { useState } from 'react'
import "./header.css"

function Header() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

  return (
    <header className={`header ${isMenuOpen ? 'menu-open' : ''}`}>
        {/* className={`logo ${isMenuOpen ? 'logo-shifted' : ''}`} */}
        <div className="logo">
            <span className="logo-text">SEES</span> Translate
        </div>
        <div className="icons">
            <div className="user-icon">
                <ion-icon name="person-circle-outline"></ion-icon>
            </div>
            <div className="menu-icon" onClick={toggleMenu}>
                <ion-icon name="menu-outline"></ion-icon>
            </div>
        </div>
        <div className={`side-menu ${isMenuOpen ? 'show' : ''}`}>
            
            <a href="/about">About Us</a>
            <a href="/contact">Contact Us</a>
        </div>
    </header>
  )
}

export default Header