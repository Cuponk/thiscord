import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import background from '../../assets/image.svg';
import './SignupFormPage.css';


function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/channels/@me" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(
                sessionActions.signup({ email, username, password })
            ).catch(async (res) => {
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
            });
        }
        return setErrors([
            "Confirm Password field must be the same as the Password field",
        ]);
    };

    return (
        <>
        <div className="signup-all">
                <div className="signup-main">
                    <div className="signup-header">
                        <p className="signup-header-title">Create an account</p>
                    </div>
                    <form className="signup-actual-form" onSubmit={handleSubmit}>
                        <ul>
                            {errors.map((error) => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                        <label for='email'className="signup-cred-text">EMAIL</label>
                        <input
                            id="email"
                            className="signup-cred-input"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label for='username' className="signup-cred-text">USERNAME</label>
                        <input
                            id="username"
                            className="signup-cred-input"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <label for='password' className="signup-cred-text">PASSWORD</label>
                        <input
                            id="password"
                            className="signup-cred-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label for='confirm' className="signup-cred-text">CONFIRM PASSWORD</label>
                        <input
                            id="confirm"
                            className="signup-cred-input"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button className="signup-button" type="submit">Continue</button>
                    </form>
                    <div className="login">
                        <a className="login-link" href="/login">Already have an account?</a>
                    </div>
                </div>
            </div>
            <img className="background-image" src={background} alt="" />
        </>
    );
}

export default SignupFormPage;
