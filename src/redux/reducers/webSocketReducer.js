import {SOCKET_CLOSED, SOCKET_CONNECTED} from "../actions/webSocketActions";
import Socket from "../../lib/socket";

const initialState = null;

function webSocketReducer(state = initialState, action){
    switch (action.type) {
        case SOCKET_CONNECTED:
            return new Socket("ws://demo-game-server.howlplay.com:9090");
        case SOCKET_CLOSED:
            console.log("Closing Socket", state);
            if (state) {
                try {
                    state.closeSocket();
                    return null;
                } catch (err) {
                    console.log(err.toString());
                    return state;
                }
            }
            return state;
        default:
            return state;
    }
}

export default webSocketReducer;
