import {SET_CURRENT_QUESTION_INDEX} from "../actions/gameActions";

const initialState = {
    currentQuestionIndex: 0
};

function gameReducer(state = initialState, action){
    switch (action.type) {
        case SET_CURRENT_QUESTION_INDEX:
            return {...state, currentQuestionIndex: action.payload.index};
        default:
            return state;
    }
}

export default gameReducer;
