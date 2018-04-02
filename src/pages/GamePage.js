import React, {Component} from 'react'
import Question from '../components/gamepage/Question'
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {setQuizData} from "../redux/actions/gameServerActions";
import axios from "axios/index";

const QUIZ_LINK = 'https://gist.githubusercontent.com/junthehacker/f17ea51b500dae8c040716f61eafe68d/raw/d0e4bd76c3fd61dcb5690e6493e1e167b7790e9f/quiz.json';


class GamePage extends Component {

    componentDidMount(){

        axios.get(QUIZ_LINK).then((data) => {
            this.props.setQuizData(data.data);
        });
    }

    render() {
        if(this.props.quizData){
            return <section id="gamepage">
                <div id="question-box">
                    <Question build={this.props.quizData[0]}/>
                    <p id="question-left"><span id="question-left-count">5</span> questions left</p>
                    <p>Connected to server: { this.props.gameServerLink }</p>
                    <p>Using nickname: { this.props.nickname }</p>
                </div>
            </section>
        } else {
            return <p>Loading ...</p>
        }
    }
}

const mapStateToProps = state => {
    return {gameServerLink: state.gameServer.link,
    nickname: state.gameServer.nickname,
    quizData: state.gameServer.quizData}
};

const mapDispatchToProps = dispatch => bindActionCreators({setQuizData}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
