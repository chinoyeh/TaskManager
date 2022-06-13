import AuthService from "../services/BackendService";
import { getAllTask, addTask, allUsers, getTask, editTask, deleteTask } from "../services/task.service";
import { ALL_USERS, LOGIN_SUCCESS, GET_ALL_TASK, ADD_TASK, GET_TASK, EDIT_TASK, DELETE_TASK } from "./type";


export const Login = (email, password) => {
    return AuthService(email, password).then(
        (data) => {
            return {
                type: LOGIN_SUCCESS,
                payload: { user: data },
            };

        },

    );

}
export const AllUsers = () => {
    return allUsers().then((response) => {
        return {
            type: ALL_USERS,
            payload: response.data.results
        }
    })
}

export const GetAllTask = () => {
    return getAllTask().then((response) => {

        return {
            type: GET_ALL_TASK,
            payload: response.data.results
        }
    });


}
export const AddTask = (assigned_user, task_date, task_time, is_completed, time_zone, task_msg) => {
    return addTask(assigned_user, task_date, task_time, is_completed, time_zone, task_msg).then(
        (data) => {
            console.log(data, 'data')
            return {
                type: ADD_TASK,
                payload: data
            }
        }
    )
}

export const GetTask = (taskId) => {
    return getTask(taskId).then((response) => {

        return {
            type: GET_TASK,
            payload: response.data.results
        }
    });
}
export const EditTask = (taskId, assigned_user, task_date, task_time, is_completed, time_zone, task_msg) => {
    return editTask(taskId, assigned_user, task_date, task_time, is_completed, time_zone, task_msg).then(
        (data) => {
            console.log(data, 'data')
            return {
                type: EDIT_TASK,
                payload: data
            }
        }
    )
}

export const DeleteTask = (taskId) => {
    return deleteTask(taskId).then((response) => {

        return {
            type: DELETE_TASK,
            payload: response.data.results
        }
    });
}