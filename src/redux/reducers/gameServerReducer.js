import {SET_QUIZ_DATA, GAME_SERVER_INPUT_ERROR, SET_GAME_SERVER} from "../actions/gameServerActions";

const initialState = {
    link: "",
    nickname: "",
    error: null,
    input: null,
    quizData: null
};


function gameServerReducer(state = initialState, action){
    console.log(action);
    switch (action.type) {
        case SET_GAME_SERVER:
            return {...state, link: action.payload.link,
                nickname: action.payload.nickname};
        case GAME_SERVER_INPUT_ERROR:
            return {...state, input: action.input, error: action.error};
        case SET_QUIZ_DATA:
            console.log(action.payload);
            return { ...state, quizData: action.payload.questions };
        default:
            return state;
    }
}

export default gameServerReducer;
