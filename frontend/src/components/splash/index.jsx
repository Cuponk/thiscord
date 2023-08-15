import React from 'react';
import { Link } from 'react-router-dom';
import './splash.css';
import '../../assets/reset.css'
import logo from '../../assets/logo.png'
const Splash = () => {

    return (
        <div className="splash">
            <div className="navbar">
                <Link className='logo-text'cto='/'> <img className='logo-img' src={logo} alt="" /> Thiscord</Link>
                <div className="links">
                    <a className='link-text' href="https://www.linkedin.com/in/justin-aitken-bb9272212/">Linkedin</a>
                    <a className='link-text' href="https://github.com/Cuponk">Github</a>
                </div>
                <div className="splash-buttons">
                    <Link to='/login'>
                        <button className="splash-login-button">Login</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Splash;