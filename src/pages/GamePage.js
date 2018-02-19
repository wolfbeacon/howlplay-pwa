import React, {Component} from 'react'
import Question from '../components/gamepage/Question'

class GamePage extends Component {

    render() {
        const inputs = {
            question: "Should Computer scientists be able to communicate via stale internet memes?",
            options: [
                "Yes",
                "No",
                "I don't know",
                "I like memes xd"
            ]
        };

        return (
            <section id="gamepage">
                <div id="question-box">
                    <Question build={inputs}/>
                    <p id="question-left"><span id="question-left-count">5</span> questions left</p>
                </div>
            </section>
        );
    }
}

export default GamePage;