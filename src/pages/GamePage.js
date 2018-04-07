import React, {Component} from 'react'
import Question from '../components/gamepage/Question'
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {getQuizData} from "../redux/actions/gameServerActions";
import {push} from "react-router-redux";
import {setCurrentQuestionIndex} from "../redux/actions/gameActions";


class GamePage extends Component {

    constructor(props){
        super(props);

        this.state = {
            score: 0,
            finished: false
        }
    }

    componentDidMount() {
        this.props.getQuizData();
        if (!this.props.gameServerLink) {
            this.props.push('/');
        }
    }

    render() {
        if (this.props.quizData) {
            return <section id="gamepage">
                {!this.state.finished ? <div id="question-box">
                    <Question build={this.props.quizData[this.props.currentQuestionIndex]}
                              onSubmitAnswer={(isCorrect) => {
                                  if (this.props.currentQuestionIndex < this.props.quizData.length - 1) {
                                      this.props.setCurrentQuestionIndex(this.props.currentQuestionIndex + 1)
                                  } else {
                                      this.setState({ finished: true });
                                  }
                                  if (isCorrect) this.setState({score: this.state.score + 1})
                              }}/>
                    <p id="question-left"><span
                        id="question-left-count">{this.props.quizData.length - this.props.currentQuestionIndex}</span> questions
                        left</p>
                    <p>Connected to server: {(this.props.socket) ? this.props.gameServerLink : null}</p>
                    <p>Using nickname: {this.props.nickname}</p>
                </div> :
                <div className="score-display">
                    <h1>Your final score is:</h1>
                    <span>{this.state.score} / {this.props.quizData.length}</span>
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
    socket: state.socket !== null
});

const mapDispatchToProps = dispatch => bindActionCreators({getQuizData, setCurrentQuestionIndex, push}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
