import React from 'react';
import Answer from "./Answer";
import ImageAnswer from "./ImageAnswer";


const listQuestions = (build, onSubmitAnswer) => build.choices.map((item, index) => {
    const id = "option-" + index;
    const match = /\*\*(Image|INP)\*\* .*/g.exec(item);
    console.log(match);
    if (match && match[1] === "Image") {
        return <ImageAnswer build={build} index={index} image={item.substr(9)} onSubmitAnswer={onSubmitAnswer}/>
    } else if (match && match[1] === "INP") {

    }
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
