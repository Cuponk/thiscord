import React from "react";
import { Link } from "react-router-dom";
import "./splash.css";
import "../../assets/reset.css";
import logo from "../../assets/logo.png";
import splashLeft from "../../assets/splash-left.png";
import splashRight from "../../assets/splash-right.png";
import splashBackground from "../../assets/splash-background.png";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";

const Splash = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState([]);

    const demoLogin = async (e) => {
        e.preventDefault();
        setErrors([]);
        const payload = {
            credential: "Cuponk",
            password: "password",
        };
        try {
            await dispatch(sessionActions.login(payload));
            history.push("/channels/@me");
        } catch (res) {
            let data;
            try {
                // .clone() essentially allows you to read the response body twice
                data = await res.clone().json();
            } catch {
                data = await res.text(); // Will hit this case if the server is down
            }
            if (data?.errors) {
                setErrors(data.errors);
            } else if (data) {
                setErrors([data]);
            } else {
                setErrors([res.statusText]);
            }
        }
    };

    return (
        <div className="splash">
            <div className="navbar">
                <Link className="logo-text" to="/">
                    {" "}
                    <img className="logo-img" src={logo} alt="" /> Thiscord
                </Link>
                <div className="links">
                    <a
                        className="link-text"
                        href="https://www.linkedin.com/in/justin-aitken-bb9272212/"
                    >
                        Linkedin
                    </a>
                    <a className="link-text" href="https://github.com/Cuponk">
                        Github
                    </a>
                </div>
                <div className="splash-buttons">
                    <Link to="/login">
                        <button className="splash-login-button">Login</button>
                    </Link>
                </div>
            </div>
            <img src={splashBackground} alt="" className="splash-background" />
            <div className="splash-body">
                <img src={splashLeft} alt="" className="splash-left" />
                <div className="splash-main">
                    <h1 className="splash-body-bold">IMAGINE A PLACE...</h1>
                    <h1 className="splash-body-text">
                        ...where you can belong to a school club, a gaming
                        group, or a worldwide art community. Where just you and
                        a handful of friends can spend time together. A place
                        that makes it easy to talk every day and hang out more
                        often.
                    </h1>
                    <button onClick={demoLogin} className="demo-button">
                        Demo Login
                    </button>
                </div>
                <img src={splashRight} alt="" className="splash-right" />
            </div>
        </div>
    );
};

export default Splash;
