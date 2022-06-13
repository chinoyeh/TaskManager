import { GET_ALL_TASK, LOGIN_FAIL, LOGIN_SUCCESS } from "../actions/type";

const user = JSON.parse(localStorage.getItem("data"));
const intialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null }
export default function (state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user
            }
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        // case GET_ALL_TASK: {
        //     return {
        //         ...state,
        //         payload

        //     }
        // }
        default:
            return state;

    }

}

