import React, {Component} from 'react'
import Question from '../components/gamepage/Question'
import {connect} from 'react-redux';


class GamePage extends Component {

    render() {
        const inputs = {
            question: "Should Computer scientists be able to communicate via stale internet memes?",
            options: [
                "Yes",
                "No",
                "I don't know",
                "I like memes xd"
            ]
        };

        return (
            <section id="gamepage">
                <div id="question-box">
                    <Question build={inputs}/>
                    <p id="question-left"><span id="question-left-count">5</span> questions left</p>
                    <p>Connected to server: { this.props.gameServerLink }</p>
                    <p>Using nickname: { this.props.nickname }</p>
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        gameServerLink: state.howlPlayApp.gameServerLink,
        nickname: state.howlPlayApp.nickname
    }
};

export default connect(mapStateToProps)(GamePage);