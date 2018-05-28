import {push} from 'react-router-redux';
import axios from "axios/index";
import {initializeSocket} from "./webSocketActions";
import {joinGame} from '../../node_api.js';
import {DEFAULT_QUIZ_LINK} from "../../configurations";

const QUIZ_LINK = DEFAULT_QUIZ_LINK;

let GAME_SERVER = "null";
let QUIZ_ID = null;
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
    return (dispatch) => {
        let error =_checkAllInput(code, nickname);
        if (error) {
            dispatch({type: GAME_SERVER_INPUT_ERROR, ...error});
        } else {
          joinGame(code, function(err, res) {
            if (err) {
              dispatch({type: GAME_SERVER_INPUT_ERROR, input: "SERVER", error: "There appears to be no gameserver for this code."});
              return;
            }
            console.log(res);
            GAME_SERVER = res.url;
            QUIZ_ID = res.id;
            dispatch({
                type: SET_GAME_SERVER,
                payload: {nickname, link: res.url}
            });
            dispatch({type: GAME_SERVER_INPUT_ERROR, input: "SERVER", error: "You've been disconnected!"});
            dispatch(push('/game'));
          });
        }
    }

}

export function getQuizData(config) {
  return dispatch => {
      axios.get(QUIZ_LINK + QUIZ_ID).then((data) => {
          console.log(data);
          dispatch ({
              type: SET_QUIZ_DATA,
              payload: data.data
          });
          dispatch(initializeSocket(GAME_SERVER, config));
      });
  }
}
