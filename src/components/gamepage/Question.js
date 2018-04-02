import React, {Component} from 'react'

class Question extends Component {
    render() {
        const listQuestions = this.props.build.choices.map((item, key) => {
            var id="option-" + key;
            return (<button className="question-answer" id={id} key={key}>{item}</button>)
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

export default Question;
