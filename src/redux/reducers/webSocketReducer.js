import {SEND_NICKNAME, SOCKET_CLOSED, SOCKET_CONNECTED} from "../actions/webSocketActions";
import Socket from "../../lib/socket";

const initialState = null;

function webSocketReducer(state = initialState, action){
    switch (action.type) {
        case SOCKET_CONNECTED:
            return new Socket(action.payload.url, action.payload.config);
        case SOCKET_CLOSED:
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
        case SEND_NICKNAME:
            if(state){
                state.setNickname(action.payload);
            }
            return state;
        default:
            return state;
    }
}

export default webSocketReducer;
