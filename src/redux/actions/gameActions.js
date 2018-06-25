import { push } from 'react-router-redux';
export const SET_CURRENT_QUESTION_INDEX = "SET_CURRENT_QUESTION_INDEX";

/**
 * Action to set current displayed question index
 * @param index
 * @returns {{type: string, payload: {index: *}}}
 */
export function setCurrentQuestionIndex(index){
    return {
        type: SET_CURRENT_QUESTION_INDEX,
        payload: { index }
    }
}

export function toLogin() {
    return dispatch => {
        dispatch(push("/"));
    }
}
