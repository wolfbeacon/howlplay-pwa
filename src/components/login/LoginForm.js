import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import logo from '../../logo.svg';
import StyledTitle from "../StyledTitle";
import {connect} from 'react-redux';

import {bindActionCreators} from "redux";
import {checkAndSwitchToGamePage} from "../../redux/actions/gameServerActions";

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
                    {this.props.error ? <p id="login-error-area">{this.props.error}</p> : null}
                    <button type="button" id="login-submit-button"
                            onClick={() => {this.props.checkAndSwitchToGamePage(this.state)}}>Login
                    </button>
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => ({error: state.gameServer.error});

const mapDispatchToProps = dispatch => bindActionCreators({checkAndSwitchToGamePage}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginForm))
