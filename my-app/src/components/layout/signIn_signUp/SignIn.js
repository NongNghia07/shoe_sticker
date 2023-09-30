import React from "react";
import useCallPostAPI from "../../../customHook/UseCallPostApi";
import { useNavigate } from "react-router-dom";

function SignInForm() {
    const [account, setState] = React.useState({
        userName: "",
        password: ""
    });

    const navigate = useNavigate()

    const handleChange = evt => {
        const value = evt.target.value;
        setState({
            ...account,
            [evt.target.name]: value
        });
    };
    let { callPost } = useCallPostAPI()

    const handleOnSubmit = evt => {
        evt.preventDefault();
        const getToken = (data) => {
            localStorage.setItem("token", data.access_token)
            navigate("/admin/product")
        }
        callPost("http://localhost:8080/api/v1/auth/authenticate", account, getToken)
    };

    return (
        <div className="form-container_login sign-in-container_login">
            <form onSubmit={handleOnSubmit} className="form_login">
                <h1 className="h1_login">Sign in</h1>
                {/* <div className="social-container_login">
                    <a href="#" className="social">
                        <i className="fab fa-facebook-f" />
                    </a>
                    <a href="#" className="social">
                        <i className="fab fa-google-plus-g" />
                    </a>
                    <a href="#" className="social">
                        <i className="fab fa-linkedin-in" />
                    </a>
                </div> */}
                {/* <span>or use your account</span> */}
                <input
                    className="input_login"
                    type="userName"
                    placeholder="UserName"
                    name="userName"
                    value={account.userName}
                    onChange={handleChange}
                />
                <input
                    className="input_login"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={account.password}
                    onChange={handleChange}
                />
                <a className="a_login">Forgot your password?</a>
                <button className="button_login">Sign In</button>
            </form>
        </div>
    );
}

export default SignInForm;
