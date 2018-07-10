import axios from "axios";
import {initializeSocket} from "./webSocketActions";
import {push} from "react-router-redux";


let GAME_SERVER = "null";
let QUIZ_ID = null;

export const SET_GAME_SERVER = 'SET_GAME_SERVER';
export const GAME_SERVER_INPUT_ERROR = "GAME_SERVER_INPUT_ERROR";
export const SET_QUIZ_DATA = "SET_QUIZ_DATA";
export const END_GAME = "END_GAME";
export const START_GAME = "START_GAME";

/**
 * Check all input, if any input is invalid, hasError will be set to true with an error message
 * @returns {boolean}
 * @private
 */
function _checkAllInput(code, nickname) {
    // code must be X6Y7Z format
    if (!code.toUpperCase().match(/^[A-Z0-9]{5}$/)) {
        return {input: "QUIZCODE", error: "Invalid Server Code"};
        // nickname cannot contain special characters, and must be 1-256 characters long.
    } else if (!nickname.match(/^[a-zA-Z0-9]{1,256}$/)) {
        return {input: "NICKNAME", error: "Invalid Nickname"};
    }
    return null;
}

/**
 * Check all input, if all valid, switch to /game
 * Also update redux store
 */
export function checkAndSwitchToGamePage({code, nickname}) {
    return async (dispatch) => {
        let error = _checkAllInput(code, nickname);
        if (error) {
            dispatch({type: GAME_SERVER_INPUT_ERROR, ...error});
        } else {
            let res = await axios.get('/quiz', {
                params: {
                    code: code
                }
            });

            if (!res.error) {
                dispatch(initializeSocket(res.data.url, {nickname: nickname}));
                dispatch(push('/game'));
            }
        }
    }
}