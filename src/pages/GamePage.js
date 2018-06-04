import React, {Component} from 'react'
import Question from '../components/gamepage/Question'
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {getQuizData} from "../redux/actions/gameServerActions";
import {push} from "react-router-redux";
import {setCurrentQuestionIndex} from "../redux/actions/gameActions";
import {submitAnswers} from "../redux/actions/webSocketActions";

class GamePage extends Component {

    constructor(props){
        super(props);

        this.state = {
            score: 0,
            keys: [],
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
        this.submitAnswersTimer = setInterval(this.onSubmitAnswers.bind(this), 200);
    }


    componentWillUnmount() {
        clearInterval(this.submitAnswersTimer);
    }

    onSubmitAnswers()  {
        this.props.submitAnswers();
    }

    onSubmitAnswer(isCorrect, key) {
        this.state.keys.push(key);
        if (this.props.currentQuestionIndex < this.props.quizData.length - 1) {
            this.props.setCurrentQuestionIndex(this.props.currentQuestionIndex + 1)
        } else {
            this.setState({ finished: true, score : this.state.score });
        }
        if (isCorrect) this.setState({score: this.state.score + 1})
    }

    render() {
        if (this.state.finished) {
            console.log(this);
        }
        if (this.props.quizData && this.props.socket) {
            return <section id="gamepage">
                {!this.state.finished ? <div id="question-box">
                    <Question build={this.props.quizData[this.props.currentQuestionIndex]}
                              onSubmitAnswer={this.onSubmitAnswer.bind(this)}/>
                    <p id="question-left"><span
                        id="question-left-count">{this.props.quizData.length - this.props.currentQuestionIndex}</span> questions
                        left</p>
                    <p>Connected to server: {(this.props.socket) ? this.props.gameServerLink : null}</p>
                    <p>Using nickname: {this.props.nickname}</p>
                </div> :
                <div className="score-display" id="score-box">
                    <h1 className="score-end-header">That&#39;s it!</h1>
                    <p className="score-end-sub">Your final score is:</p>
                    <span className="score-end-score">{this.state.score} / {this.props.quizData.length}</span>
                    <div className="score-end-review">
                      <h2 className="score-end-review-header">Overview</h2>
                      {
                        /* Go through all the questions */
                        this.props.quizData.map((item, key) => {
                          let q = this.props.quizData[key];

                          return <div className="score-end-review-item" key={key}>
                            <h3 className="score-end-review-question">{item.title}</h3>

                            {/* Get selected answer and set it's state */}
                            <p className={
                              // eslint-disable-next-line
                              q.answer == this.state.keys[key]?
                              "score-end-review-option score-end-review-true":
                              "score-end-review-option score-end-review-false"
                            }>{ q.choices[this.state.keys[key]] }</p>

                            {/* Provide solution if incorrect answer */}
                            {
                              // eslint-disable-next-line
                              q.answer != this.state.keys[key]?
                              <p className="score-end-review-answer">The correct answer is "{ q.choices[q.answer] }"</p> : null
                            }
                          </div>
                        })
                      }
                    </div>
                    <p className="score-end-hint">Please do not close this page until the game ends.</p>
                </div>
                }
            </section>
        } else {
            return <p>Loading ...</p>
        }
    }
}

const mapStateToProps = state => ({
    gameServerLink: state.gameServer.link,
    nickname: state.gameServer.nickname,
    quizData: state.gameServer.quizData,
    currentQuestionIndex: state.game.currentQuestionIndex,
    socket: state.socket
});

const mapDispatchToProps = dispatch => bindActionCreators({getQuizData, setCurrentQuestionIndex, submitAnswers, push}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
