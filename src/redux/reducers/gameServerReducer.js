import {SET_QUIZ_DATA, GAME_SERVER_INPUT_ERROR, SET_GAME_SERVER} from "../actions/gameServerActions";

const initialState = {
    gameServerLink: "",
    nickname: "",
    error: null,
    quizData: null
};


function gameServerReducer(state = initialState, action){

    switch (action.type) {
        case SET_GAME_SERVER:
            return {...state, gameServerLink: action.payload.link,
                nickname: action.payload.nickname};
        case GAME_SERVER_INPUT_ERROR:
            return {...state, error: action.error};
        case SET_QUIZ_DATA:
            console.log(action.payload);
            return { ...state, quizData: action.payload.data };
        default:
            return state;
    }
}

export default gameServerReducer;
