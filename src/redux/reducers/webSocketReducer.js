import {SOCKET_CLOSED, SOCKET_CONNECTED} from "../actions/webSocketActions";
import Socket from "../../lib/socket";

const initialState = null;

function webSocketReducer(state = initialState, action){
    switch (action.type) {
        case SOCKET_CONNECTED:
            return new Socket("ws://demo-game-server.howlplay.com:9090");
        case SOCKET_CLOSED:
            if (state) {
                try {
                    state.closeSocket();
                } catch (err) {
                    console.log(err.toString());
                }
            }
            return null;
        default:
            return state;
    }
}

export default webSocketReducer;
