export const SOCKET_CONNECTED = "SOCKET_CONNECTED";
export const SOCKET_CLOSED = "SOCKET_CLOSED";
export const SEND_NICKNAME = "SEND_NICKNAME";
export const QUEUE_ANSWER = "QUEUE_ANSWER";
export const SUBMIT_ANSWERS = "SUBMIT_ANSWERS";


export const initializeSocket = (url, config) => (dispatch) => {
    dispatch({
        type: SOCKET_CONNECTED,
        payload: {
            url, config
        }
    })
};


export function queueAnswer(answer){
    return {
        type: QUEUE_ANSWER,
        payload: answer
    }
}

export function submitAnswers(){
    return {
        type: SUBMIT_ANSWERS
    }
}

export function closeSocket() {
    return {
        type: SOCKET_CLOSED
    }
}
