import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';


const Splash = () => {
    
    const dispatch = useDispatch();

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    return (
        <div className="splash">
            <h1>WELCOME TO THISCORD</h1>

            <div className="splash-buttons">
                <Link to='/login'>
                    <button className="splash-login-button">Login</button>
                </Link>

                <Link to='/signup'>
                    <button className="splash-signup-button">Sign Up</button>
                </Link>

                <button onClick={handleLogout}>Log Out</button>
            </div>
        </div>
    )
}

export default Splash;