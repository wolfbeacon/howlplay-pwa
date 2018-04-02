import Driver from "./driver/main";

function getCode (buf) {
    let dataView = new Uint8Array(buf);
    return dataView[0];
}

class SocketApi {
    constructor(url) {
        this.connected = false;
        this.error = false;
        this.socket = new WebSocket(url);
        this.socket.binaryType = 'arraybuffer';

        this.socket.onopen = () => {
            this.connected = true;
        };

        this.socket.onerror = (err) => {
            console.log(err);
            this.error = true;
        };

        this.socket.onmessage = (e) => {
            let code = getCode(e.data);
            console.log(code);
            switch (code) {
                case 0:
                    Driver.handlers.pingHandler().then(buf => this.socket.send(buf));
                    break;
                case 2:
                    Driver.handlers.nicknameAcceptedHandler();
                    break;
                case 3:
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
                    break;
                case 10:
                    Driver.handlers.answersRejectedHandler();
                    break;
                default:
                    break;
            }
        };
    }


    setNickname(nickname) {
        console.log(nickname, this.socket);
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
}

let api = null;


class SocketWrapper {
    constructor(url) {
        // To prevent there from being more than one socket intialized at a time
        if (!api) {
            console.log("Opening Connection to", url);
            api = new SocketApi(url);
        }
    }

    _validateSocket(next, ...args) {
        if (api && api.connected && api.error === false) {
            return next(...args);
        } else {
            throw new Error("Socket is not open, or not connected!");
        }
    }

    setNickname(...args) {
        SocketWrapper._validateSocket(api.setNickname.bind(api), ...args);
    }

    checkHash (...args) {
        SocketWrapper._validateSocket(api.checkHash.bind(api), ...args);
    }

    sendAnswers (...args) {
        SocketWrapper._validateSocket(api.sendAnswers.bind(api), ...args);
    }

    closeSocket (...args) {
        SocketWrapper._validateSocket(api.closeSocket.bind(api), ...args);
        api = null;
    }
}

export default SocketWrapper;