import React, { useState } from "react";
import "../../../css/SignInUp.css";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";

export default function LayoutSign_In_Up() {
    const [type, setType] = useState("signIn");
    const handleOnClick = text => {
        if (text !== type) {
            setType(text);
            return;
        }
    };
    const containerClass =
        "container_login " + (type === "signUp" ? "right-panel-active" : "");
    return (
        <div className="App_login">
            <div className={containerClass} id="container_login">
                <SignUpForm />
                <SignInForm />
                <div className="overlay-container_login">
                    <div className="overlay_login">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p className="p_login">
                                To keep connected with us please login with your personal info
                            </p>
                            <button
                                className="ghost_login"
                                id="signIn"
                                onClick={() => handleOnClick("signIn")}
                            >
                                Sign In
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1 className="h1_login">Hello, Friend!</h1>
                            <p className="p_login">Enter your personal details and start journey with us</p>
                            <button
                                className="ghost_login "
                                id="signUp"
                                onClick={() => handleOnClick("signUp")}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}