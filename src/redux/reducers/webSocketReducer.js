import {
    QUEUE_ANSWER,
    SEND_NICKNAME,
    SOCKET_CLOSED,
    SOCKET_CONNECTED,
    SUBMIT_ANSWERS
} from "../actions/webSocketActions";
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
        case QUEUE_ANSWER:
            if(state){
                state.queueAnswer(action.payload);
            }
            return state;
        case SUBMIT_ANSWERS:
            if(state){
                state.submitAnswers();
            }
            return state;
        default:
            return state;
    }
}

export default webSocketReducer;
