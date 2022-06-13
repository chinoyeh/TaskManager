import { ADD_TASK, ALL_USERS, GET_ALL_TASK, GET_TASK, EDIT_TASK, DELETE_TASK } from "../actions/type";


const intialState = {
    task: []
}
export default function (state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
        case ALL_USERS: {
            return {
                payload,
            }
        }
        case GET_ALL_TASK: {
            return {
                ...state,
                payload,

            }
        }
        case ADD_TASK: {
            return {
                ...state,
                payload
            }
        }
        case GET_TASK: {
            return {
                ...state,
                payload,

            }
        }
        case EDIT_TASK: {
            return {
                ...state,
                payload,

            }
        }
        case DELETE_TASK: {
            return {
                ...state,
                payload,

            }
        }
        default:
            return state;

    }

}

