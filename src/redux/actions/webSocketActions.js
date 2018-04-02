export const SOCKET_CONNECTED = "SOCKET_CONNECTED";
export const SOCKET_CLOSED = "SOCKET_CLOSED";

export function initializeSocket(url) {
    return {
        type: SOCKET_CONNECTED,
        payload: url
    }
}

export function closeSocket() {
    return {
        type: SOCKET_CLOSED
    }
}