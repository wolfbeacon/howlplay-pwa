import React from 'react';
import {bindActionCreators} from "redux";
import {queueAnswer} from "../../redux/actions/webSocketActions";
import {connect} from "react-redux";

const submitAnswer = (build, input, queueAnswer, onSubmitAnswer) => {
    let answer = parseInt(build.answer, 10);
    onSubmitAnswer(answer.toLowerCase() === input.toLowerCase(), input);
    queueAnswer(input);
};

class InputAnswer extends React.Component {
    constructor() {
        super();
        this.state = {input: ""}
    }

    inputChange(e) {
        this.setState({input: e.target.value})
    }

    render() {
        return (
            <input className="image-answer"
                   onClick={() => submitAnswer(this.props.build, this.props.index, this.props.queueAnswer, this.props.onSubmitAnswer)}
                   id={this.props.id} key={this.props.index} value={this.state.input} onChange={this.inputChange.bind(this)} alt=""/>
        )
    }
}

const InputAnswer = ({index, id, image, build, queueAnswer, onSubmitAnswer}) => ;

const mapDispatchToProps = dispatch => bindActionCreators({queueAnswer}, dispatch);

export default connect(null, mapDispatchToProps) (InputAnswer)
