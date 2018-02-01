import React, { Component } from 'react';
import LoginForm from "../components/login/LoginForm";

class Login extends Component {
    render() {
        return (
            <div className="page" id="login">
                <h1 id="login-page-title">How I Play</h1>
                <LoginForm/>
            </div>
        );
    }
}

export default Login;
