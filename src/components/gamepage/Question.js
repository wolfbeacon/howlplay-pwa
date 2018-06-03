import React from 'react';
import Answer from "./Answer";


const listQuestions = (build, onSubmitAnswer) => build.choices.map((item, index) => {
    let id = "option-" + index;
    return <Answer build={build} id={id} index={index} item={item} onSubmitAnswer={onSubmitAnswer}/>
});


const Question = ({build, onSubmitAnswer}) =>
    <div id="question-area">
        <h1 id="question-title">{build.title}</h1>
        <div id="question-options">
            {listQuestions(build, onSubmitAnswer)}
        </div>
    </div>;


export default Question;
