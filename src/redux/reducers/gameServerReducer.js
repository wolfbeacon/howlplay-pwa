import { 
    SET_QUIZ_DATA, 
    GAME_SERVER_INPUT_ERROR, 
    SET_GAME_SERVER, 
    END_GAME, 
    START_GAME
} from "../actions/gameServerActions";

const initialState = {
    link: "",
    nickname: "",
    error: null,
    input: null,
    quizData: null,
    start: false,
    end: false
};


function gameServerReducer(state = initialState, action){
    switch (action.type) {
        case SET_GAME_SERVER:
            return {...state, link: action.payload.link,
                nickname: action.payload.nickname};
        case GAME_SERVER_INPUT_ERROR:
            return {...state, input: action.input, error: action.error};
        case SET_QUIZ_DATA:
            return { ...state, quizData: action.payload.questions };
        case END_GAME:
            return { ...state, end: true };
        case START_GAME:
            return { ...state, start: true };
        default:
            return state;
    }
}

export default gameServerReducer;
