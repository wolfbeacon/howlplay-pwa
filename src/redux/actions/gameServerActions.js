import {push} from 'react-router-redux';
import axios from "axios/index";
import {initializeSocket} from "./webSocketActions";


const DEFAULT_GAME_SERVER = "ws://localhost:1234";
const QUIZ_LINK = 'https://gist.githubusercontent.com/junthehacker/f17ea51b500dae8c040716f61eafe68d/raw/d0e4bd76c3fd61dcb5690e6493e1e167b7790e9f/quiz.json';

export const SET_GAME_SERVER = 'SET_GAME_SERVER';
export const GAME_SERVER_INPUT_ERROR = "GAME_SERVER_INPUT_ERROR";
export const SET_QUIZ_DATA = "SET_QUIZ_DATA";

/**
 * Check all input, if any input is invalid, hasError will be set to true with an error message
 * @returns {boolean}
 * @private
 */
function _checkAllInput(code, nickname) {
    // code must be X6Y7Z format
    if (!code.toUpperCase().match(/^[A-Z0-9]{5}$/)) {
        return "Invalid server code"
        // nickname cannot contain special characters, and must be 1-256 characters long.
    } else if (!nickname.match(/^[a-zA-Z0-9]{1,256}$/)) {
        return "Invalid nickname";
    }
    return null;
}

/**
 * Check all input, if all valid, switch to /game
 * Also update redux store
 */
export function checkAndSwitchToGamePage({code, nickname}) {
    return (dispatch) => {
        let error =_checkAllInput(code, nickname);
        if (error) {
            dispatch({type: GAME_SERVER_INPUT_ERROR, error: error});
        } else {
            dispatch({
                type: SET_GAME_SERVER,
                payload: {nickname, link: DEFAULT_GAME_SERVER}
            });
            dispatch({type: GAME_SERVER_INPUT_ERROR, error: null});
            dispatch(push('/game'));
        }
    }

}

export function getQuizData() {
    return dispatch => {
        axios.get(QUIZ_LINK).then((data) => {
            dispatch ({
                type: SET_QUIZ_DATA,
                payload: data
            });
            dispatch(initializeSocket());
        });
    }
}
