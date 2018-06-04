import React from 'react';
import {bindActionCreators} from "redux";
import {queueAnswer} from "../../redux/actions/webSocketActions";
import {connect} from "react-redux";

const submitAnswer = (build, index, queueAnswer, onSubmitAnswer) => {
    let answer = parseInt(build.answer, 10);
    onSubmitAnswer(answer === index, index, "IMAGE");
    queueAnswer(index);
};

const ImageAnswer = ({index, id, image, build, queueAnswer, onSubmitAnswer}) => <img className="image-answer" onClick={() => submitAnswer(build, index, queueAnswer, onSubmitAnswer)} id={id} key={index} src={image} alt=""/>;

const mapDispatchToProps = dispatch => bindActionCreators({queueAnswer}, dispatch);

export default connect(null, mapDispatchToProps) (ImageAnswer)
