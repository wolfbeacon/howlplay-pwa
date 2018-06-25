import React, {Component} from 'react'
import Question from '../components/gamepage/Question';
import EndList from '../components/gamepage/EndList';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {getQuizData} from "../redux/actions/gameServerActions";
import {push} from "react-router-redux";
import {setCurrentQuestionIndex, toLogin} from "../redux/actions/gameActions";
import {submitAnswers} from "../redux/actions/webSocketActions";

class GamePage extends Component {

    constructor(props){
        super(props);

        this.state = {
            score: 0,
            answers: [],
            finished: false
        };

        this.submitAnswersTimer = null;
    }

    componentDidMount() {
        this.props.getQuizData({
            nickname: this.props.nickname
        });
        if (!this.props.gameServerLink) {
            this.props.push('/');
        }

        // Set a interval for submit answers, right now 200 mil secs
        this.submitAnswersTimer = setInterval(this.onSubmitAnswers.bind(this), 500);
    }

    componentWillUnmount() {
        clearInterval(this.submitAnswersTimer);
    }

    onSubmitAnswers()  {
        this.props.submitAnswers();
    }

    onSubmitAnswer(isCorrect, key, type) {
        this.state.answers.push({answer: key, type: type});
        if (this.props.currentQuestionIndex < this.props.quizData.length - 1) {
            this.props.setCurrentQuestionIndex(this.props.currentQuestionIndex + 1)
        } else {
            this.setState({ finished: true, score : this.state.score });
        }
        if (isCorrect) this.setState({score: this.state.score + 1})
    }

    gameScreen() {
        return <div id="question-box">
            <Question build={this.props.quizData[this.props.currentQuestionIndex]}
                onSubmitAnswer={this.onSubmitAnswer.bind(this)} />
            <p id="question-left">
                <span id="question-left-count">{this.props.quizData.length - this.props.currentQuestionIndex} </span>
                questions left
            </p>
            <p>Connected to server: {(this.props.socket) ? this.props.gameServerLink : null}</p>
            <p>Using nickname: {this.props.nickname}</p>
        </div>;
    }

    endScreen() {
        return <div className="score-display" id="score-box">
            <h1 className="score-end-header">That&#39;s it!</h1>
            <p className="score-end-sub">Your final score is:</p>
            <span className="score-end-score">{this.state.score} / {this.props.quizData.length}</span>
            <EndList answers={this.state.answers} questions={this.props.quizData} />
            {
            this.props.end ?
            <div>
                <p className="score-end-hint">The game has ended. Thank you for playing using HowlPlay.</p>
                <button className="score-end-button" onClick={ this.props.toLogin }>Exit Game</button>
            </div> :
            <p className="score-end-hint">Please do not close this page until the game ends.</p>
            }
        </div>
    }

    switch() {
        if (!this.props.start && !this.props.end) {
            return <div id="lobby-box" className="score-display" style={{ padding: "40px" }}>
                <h2 className="score-lobby-header">Welcome { this.props.nickname }</h2>
                <p className="score-lobby-text">The game is about to begin...</p>
            </div>;
        } else if (this.props.quizData && this.props.socket) {
            if (!this.state.finished && !this.props.end) {
                return this.gameScreen();
            } else {
                return this.endScreen();
            }
        } else {
            return <div className="score-display" style={{ padding: "40px" }}><p>Loading ...</p></div>;
        }
    }

    render() {
        return <section id="gamepage">
            { this.switch() }
        </section>
    }
}

const mapStateToProps = state => ({
    gameServerLink: state.gameServer.link,
    nickname: state.gameServer.nickname,
    quizData: state.gameServer.quizData,
    currentQuestionIndex: state.game.currentQuestionIndex,
    socket: state.socket,
    start: state.gameServer.start,
    end: state.gameServer.end
});

const mapDispatchToProps = dispatch => bindActionCreators({getQuizData, setCurrentQuestionIndex, submitAnswers, push, toLogin}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
