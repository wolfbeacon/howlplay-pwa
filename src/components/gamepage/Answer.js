import React from 'react';
import {bindActionCreators} from "redux";
import {queueAnswer} from "../../redux/actions/webSocketActions";
import {connect} from "react-redux";

const submitAnswer = (build, index, queueAnswer, onSubmitAnswer) => {
    let answer = parseInt(build.answer, 10);
    onSubmitAnswer(answer === index);
    queueAnswer(index);
};

const Answer = ({index, id, item, build, queueAnswer, onSubmitAnswer}) => <button className="question-answer" onClick={() => submitAnswer(build, index, queueAnswer, onSubmitAnswer)} id={id} key={index}>{item}</button>;

const mapDispatchToProps = dispatch => bindActionCreators({queueAnswer}, dispatch);

export default connect(null, mapDispatchToProps) (Answer)