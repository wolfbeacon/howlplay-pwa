import {SET_GAME_SERVER} from "./actions";

const initialState = {
    gameServerLink: "",
    nickname: ""
};

function howlPlayApp(state = initialState, action){

    switch (action.type) {
        case SET_GAME_SERVER:
            return Object.assign({}, state, {
                gameServerLink: action.link,
                nickname: action.nickname
            });
        default:
            return state;
    }
}

export default howlPlayApp;