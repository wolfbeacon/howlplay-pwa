import React, {Component} from 'react'
import {bindActionCreators} from "redux";
import {queueAnswer} from "../../redux/actions/webSocketActions";
import {connect} from "react-redux";

class Question extends Component {
    render() {
        const listQuestions = this.props.build.choices.map((item, key) => {
            let id="option-" + key;
            return (<button className="question-answer" onClick={() => {
              let answer = parseInt(this.props.build.answer, 10);
                this.props.onSubmitAnswer(answer === key);
                this.props.queueAnswer(key);
            }} id={id} key={key}>{item}</button>)
        });
        return(
            <div id="question-area">
                <h1 id="question-title">{this.props.build.title}</h1>
                <div id="question-options">
                    {listQuestions}
                </div>
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => bindActionCreators({queueAnswer}, dispatch);

export default connect(null, mapDispatchToProps)(Question);
