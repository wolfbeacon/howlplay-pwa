/*
 * action types
 */

export const SET_GAME_SERVER = 'SET_GAME_SERVER';

/*
 * action creators
 */

export function setGameServer(link, nickname) {
    return { type: SET_GAME_SERVER, link, nickname }
}
