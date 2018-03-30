import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import logo from '../../logo.svg';
import StyledTitle from "../StyledTitle";
import {connect} from 'react-redux';

import {
    setGameServer
} from '../../actions'


const DEFAULT_GAME_SERVER = "ws://localhost:1234";

class LoginForm extends Component {

    /**
     * Default React.js component constructor
     * @param args
     */
    constructor(...args) {
        super(...args);
        this.state = {
            code: "",
            nickname: "",
            hasError: false,
            error: ""
        }
    }

    /**
     * Handle onChange event for all text inputs
     * @param event
     */
    onTextChange(event) {
        // parent class change handler is always called with field name and value
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    /**
     * Check all input, if any input is invalid, hasError will be set to true with an error message
     * @returns {boolean}
     * @private
     */
    _checkAllInput() {
        // code must be X6Y7Z format
        if (!this.state.code.toUpperCase().match(/^[A-Z0-9]{5}$/)) {
            this.setState({
                hasError: true,
                error: "Invalid server code"
            });
            return false;
            // nickname cannot contain special characters, and must be 1-256 characters long.
        } else if (!this.state.nickname.match(/^[a-zA-Z0-9]{1,256}$/)) {
            this.setState({
                hasError: true,
                error: "Invalid nickname"
            });
            return false;
        }
        return true;
    }

    /**
     * Check all input, if all valid, switch to /game
     * Also update redux store
     */
    checkAndSwitchToGamePage() {
        this.setState({hasError: false});
        if (this._checkAllInput()) {
            this.props.dispatch(setGameServer(DEFAULT_GAME_SERVER, this.state.nickname));
            this.props.history.push('/game')
        }
    }

    /**
     * Default React.js render handler
     * @returns {*}
     */
    render() {
        return (
            <form id="login-form">
                <div id="login-body">
                    <img src={logo} id="login-logo" alt="logo"/>
                    <div>
                        <StyledTitle/>
                        <h3 id="login-subheading">Join Game</h3>
                        <div className="login-input-section">
                            <label className="login-form-label sr-only" htmlFor="code-input">Server Code</label>
                            <input type="text" className="login-input" id="code-input" name="code"
                                   onChange={this.onTextChange.bind(this)} placeholder="X8UKL"/>
                        </div>
                        <div className="login-input-section">
                            <label className="login-form-label sr-only" htmlFor="nickname-input">Nickname</label>
                            <input type="text" className="login-input" id="nickname-input" name="nickname"
                                   onChange={this.onTextChange.bind(this)} placeholder="Nickname"/>
                        </div>
                    </div>
                </div>
                <div id="login-error-container">
                    {this.state.hasError ? <p id="login-error-area">{this.state.error}</p> : null}
                    <button type="button" id="login-submit-button"
                            onClick={() => this.checkAndSwitchToGamePage()}>Login
                    </button>
                </div>
            </form>
        );
    }
}


export default connect()(withRouter(LoginForm))
