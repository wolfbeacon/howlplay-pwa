import React, {Component} from 'react'
import Question from '../components/gamepage/Question'
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {getQuizData} from "../redux/actions/gameServerActions";



class GamePage extends Component {

    componentDidMount(){
        this.props.getQuizData();
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

const mapDispatchToProps = dispatch => bindActionCreators({getQuizData}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
