export const SOCKET_CONNECTED = "SOCKET_CONNECTED";
export const SOCKET_CLOSED = "SOCKET_CLOSED";
export const SEND_NICKNAME = "SEND_NICKNAME";


export const initializeSocket = (url, config) => (dispatch) => {
    dispatch({
        type: SOCKET_CONNECTED,
        payload: {
            url, config
        }
    })
};


export function closeSocket() {
    return {
        type: SOCKET_CLOSED
    }
}
