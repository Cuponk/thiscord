import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginFormPage.css';
import background from '../../assets/image.svg';
import { useHistory } from "react-router-dom";

function LoginFormPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/channels/@me" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password })).catch(
            async (res) => {
                let data;
                try {
                    // .clone() essentially allows you to read the response body twice
                    data = await res.clone().json();
                } catch {
                    data = await res.text(); // Will hit this case if the server is down
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            }
            );
            history.push('/channels/@me');
    };

    return (
        <>
            <div className="login-all">
                <div className="login-main">
                    <div className="login-header">
                        <p className="login-header-title">Welcome Back!</p>
                        <p className="login-header-main">We're so excited to see you again!</p>
                    </div>
                    <form className="login-actual-form" onSubmit={handleSubmit}>
                        <ul>
                            {errors.map((error) => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                        <label for='username' className="login-cred-text">EMAIL OR USERNAME</label>
                        <input
                            id="username"
                            className="login-cred-input"
                            type="text"
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            required
                        />
                        <label for='password' className="login-cred-text">PASSWORD</label>
                        <input
                            className="login-cred-input"
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        
                        <button className="login-button" type="submit">Log In</button>
                    </form>
                    <div className="register">
                        <p className="register-text">Need an account? <a className="register-link" href="/signup"> Register</a></p>
                    </div>
                </div>
            </div>
            <img className="background-image" src={background} alt="" />
        </>
    );
}

export default LoginFormPage;
