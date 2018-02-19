import Driver from "./driver/main";

function getCode (buf) {
    let dataView = new Uint8Array(buf);
    return dataView[0];
}

class SocketApi {
    constructor() {
        this.connected = false;
        this.error = false;
        this.socket = new WebSocket('ws://localhost:9090');
        this.socket.binaryType = 'arraybuffer';

        this.socket.onopen = () => {
            this.setNickname("Bobby");
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
                case 2:
                    Driver.handlers.nicknameAcceptedHandler();
                    break;
                case 3:
                    Driver.handlers.nicknameRejectedHandler();
                    break;
                default:
                    break;
            }
        };
    }

    setNickname(nickname) {
        Driver.emitters.nicknameEmitter(nickname).then((buf) => {
            console.log(buf);
            this.socket.send(buf)
        });
    }
}

const api = new SocketApi();


// a wrapper around the socket api to allow for the application of middleware
const SocketWrapper = {
    _validateSocket: (next, ...args) => {
        if (api.connected && api.error === false) {
            return next(...args);
        } else {
            throw new Error("Could not talk to socket at the moment");
        }
    },

    setNickname: (...args) => {
        SocketWrapper._validateSocket(api.setNickname, args)
    }
};

export default SocketWrapper;