import {GAME_SERVER_INPUT_ERROR, SET_GAME_SERVER} from "../actions/gameServerActions";

const initialState = {
    gameServerLink: "",
    nickname: "",
    error: null
};

function gameServerReducer(state = initialState, action){

    switch (action.type) {
        case SET_GAME_SERVER:
            return {...state, gameServerLink: action.payload.link,
                nickname: action.payload.nickname};
        case GAME_SERVER_INPUT_ERROR:
            console.log(action.error);
            return {...state, error: action.error};
        default:
            return state;
    }
}

export default gameServerReducer;
