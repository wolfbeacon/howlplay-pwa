import React, { Component } from 'react';
import logo from '../../logo.svg';

class LoginForm extends Component {
    render() {
        return (
            <form id="login-form">
              <div id="login-body">
                <img src={logo} id="login-logo" alt="logo" />
                <div>
                  <h1 id="login-heading">HowlPlay</h1>
                  <h3 id="login-subheading">Login</h3>
                  <div className="login-input-section">
                      <label className="login-form-label sr-only" htmlFor="passcode-input">5 Digit Code</label>
                      <input type="number" className="login-input" id="passcode-input" placeholder="5 Digit Code"/>
                  </div>
                  <div className="login-input-section">
                      <label className="login-form-label sr-only" htmlFor="nickname-input">Nickname</label>
                      <input type="text" className="login-input" id="nickname-input" placeholder="Nickname"/>
                  </div>
                </div>
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
