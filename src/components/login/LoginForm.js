import React, { Component } from 'react';

class LoginForm extends Component {
    render() {
        return (
            <form id="login-form">
                <h3 id="login-subheading">Login</h3>
                <div className="login-input-section">
                    <label className="login-form-label" htmlFor="passcode-input">5 Digit Code: </label>
                    <input type="number" className="login-input" id="passcode-input"/>
                </div>
                <div className="login-input-section">
                    <label className="login-form-label" htmlFor="nickname-input">Nickname: </label>
                    <input type="text" className="login-input" id="nickname-input"/>
                </div>
                <div id="login-error-container">
                    <p id="login-error-area">Something went wrong! Please try again.</p>
                    <button id="login-submit-button">Login</button>
                </div>

            </form>
        );
    }
}

export default LoginForm;
