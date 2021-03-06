import Driver from "./driver/main";
import { store } from "../index";
import { push } from "react-router-redux";
import { START_GAME, END_GAME } from '../redux/actions/gameServerActions';

function getCode (buf) {
    let dataView = new Uint8Array(buf);
    return dataView[0];
}

class SocketApi {
    constructor(url, config) {
        this.connected = false;
        this.error = false;
        this.socket = new WebSocket(url);
        this.socket.binaryType = 'arraybuffer';
        this.config = config;
        this.nicknameSet = false;
        this.answerQueue = [];
        this.currentQueueIndex = 0;
        this.lastAnswerSubmissionDone = true;


        this.socket.onopen = () => {
            this.connected = true;
            // We can now set the nickname
            this.setNickname(this.config.nickname);
        };

        this.socket.onerror = (err) => {
            console.log(err);
            this.error = true;
        };

        this.socket.onmessage = (e) => {
            let code = getCode(e.data);
            // console.log(code);
            switch (code) {
                case 0:
                    Driver.handlers.pingHandler().then(buf => this.socket.send(buf));
                    break;
                case 2:
                    this.nicknameSet = true;
                    Driver.handlers.nicknameAcceptedHandler();
                    // Emit hash check
                    this.checkHash("abc");
                    break;
                case 3:
                    this.closeSocket();
                    Driver.handlers.nicknameRejectedHandler();
                    break;
                case 5:
                    Driver.handlers.quizAcceptedHandler();
                    break;
                case 6:
                    Driver.handlers.quizRejectedHandler();
                    break;
                case 9:
                    Driver.handlers.answersAcceptedHandler();
                    this.lastAnswerSubmissionDone = true;
                    this.currentQueueIndex += this.answerQueue.length;
                    this.answerQueue = [];
                    break;
                case 10:
                    Driver.handlers.answersRejectedHandler();
                    this.lastAnswerSubmissionDone = true;
                    break;
                case 12:
                    console.log("START ZE GAME");
                    store.dispatch({type: START_GAME});
                    break;
                case 13:
                    console.log("END OF ZE GAME");
                    store.dispatch({type: END_GAME});
                    break;
                default:
                    break;
            }
        };

        this.socket.onclose = (e) => {
            store.dispatch(push('/'));
            api = null;
        }
    }


    setNickname(nickname) {
        Driver.emitters.nicknameEmitter(nickname).then((buf) => this.socket.send(buf));
    }

    /**
     * Validates hash on server for quiz is same as on client
     * @param quiz string representation of the quiz
     */
    checkHash(quiz) {
        Driver.emitters.quizHashEmitter(quiz).then((buf) => this.socket.send(buf));
    }

    sendAnswers(index, answers) {
        let payload = [index, ...answers];
        Driver.emitters.answersEmitter(payload).then((buf) => this.socket.send(buf));
    }

    closeSocket() {
        this.socket.close();
    }

    queueAnswer(answer){
        this.answerQueue.push(answer);
        console.log("Answer queue", this.answerQueue);
    }
}

let api = null;


class SocketWrapper {
    constructor(url, config) {
        // To prevent there from being more than one socket intialized at a time
        if (!api) {
            console.log("Opening Connection to", url);
            api = new SocketApi(url, config);
        }
        this.api = api;
    }

    _validateSocket(next, ...args) {
        if (api && api.connected && api.error === false) {
            return next(...args);
        } else {
            throw new Error("Socket is not open, or not connected!");
        }
    }

    queueAnswer(...args){
        this._validateSocket(api.queueAnswer.bind(api), ...args);
    }

    setNickname(...args) {
        this._validateSocket(api.setNickname.bind(api), ...args);
    }

    checkHash (...args) {
        this._validateSocket(api.checkHash.bind(api), ...args);
    }

    sendAnswers (...args) {
        this._validateSocket(api.sendAnswers.bind(api), ...args);
    }

    closeSocket (...args) {
        this._validateSocket(api.closeSocket.bind(api), ...args);
    }

    submitAnswers(){
        if(!this.api.lastAnswerSubmissionDone){
            console.log("Still waiting for last submission...");
            return;
        }
        if(this.api.answerQueue.length === 0){
            console.log("No answers to submit... queue empty");
            return;
        }
        this.api.answerQueue.lastAnswerSubmissionDone = false;
        this.api.sendAnswers(this.api.currentQueueIndex, this.api.answerQueue);
    }
}

export default SocketWrapper;
