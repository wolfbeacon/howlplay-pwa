import React, { Component } from 'react';
import LoginForm from "../components/login/LoginForm";

class Login extends Component {
    render() {

        return (
          <header className="page" id="login">
            <LoginForm onSwithToGame={() => {}} />
          </header>
        );
    }
}

export default Login;
