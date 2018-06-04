import React from 'react';

const buildImage = (answer, question) => {
  let a = parseInt(question.answer, 10);
  return <div className="score-end-review-image">
    <div>
      <img className={
        a === answer ?
        "score-end-review-option score-end-review-true" :
        "score-end-review-option score-end-review-false"
      } src={question.choices[answer].substr(9)} alt=""/>
      {
        a !== answer ?
        <img className="score-end-review-option score-end-review-answer" src={question.choices[a].substr(9)} alt=""/> :
        null
      }
    </div>
    <div className="score-end-review-caption">
      {
        a === answer ?
        <p>Correct!</p> :
        <p>Incorrect :/<br/> Image #{a} was the correct answer</p>
      }
    </div>
  </div>;
};

const buildChoice = (answer, question) => {
  let a = parseInt(question.answer, 10);
  return <div className="score-end-review-choice">
    <p className={
      a === answer?
      "score-end-review-option score-end-review-true":
      "score-end-review-option score-end-review-false"
    }>{ question.choices[answer] }</p>

    {
      a !== answer?
      <p className="score-end-review-answer">The correct answer is "{ question.choices[a] }"</p> : null
    }
  </div>;
};

// Go through all the questions
const buildList = (answers, questions) => questions.map((item, key) => {
  let q = questions[key];
  let a = answers[key].answer;
  let type = answers[key].type;

  return <div className="score-end-review-item" key={key}>
    <h3 className="score-end-review-question">{item.title}</h3>
    { type === 'OPTION' ? (
      buildChoice(a, q)
    ) : type === 'IMAGE' ? (
      buildImage(a, q)
    ) : null }
  </div>
});

const EndList = ({answers, questions}) =>
  <div className="score-end-review">
    <h2 className="score-end-review-header">Overview</h2>
    {buildList(answers, questions)}
  </div>;

export default EndList;
