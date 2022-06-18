import axios from 'axios'
import authHeader from './authHeader'

const baseUrl = "https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691"

export const allUsers = () => {

    const data = JSON.parse(localStorage.getItem("data"))

    const companyId = data.results.company_id

    const endpoint = "https://stage.api.sloovi.com/team?product=outreach&company_id=" + companyId

    return axios
        .get(endpoint, { headers: authHeader() })

        .then((response) => {

            return response
        })
}

export const getAllTask = () => {

    const data = JSON.parse(localStorage.getItem("data"))

    const companyId = data.results.company_id

    const endpoint = baseUrl + "?company_id=" + companyId

    return axios
        .get(endpoint, { headers: authHeader() })

        .then((response) => {

            return response
        })
}
export const addTask = (assigned_user, task_date, task_time, is_completed, time_zone, task_msg) => {
    const data = JSON.parse(localStorage.getItem("data"))

    const companyId = data.results.company_id

    const endpoint = baseUrl + "?company_id=" + companyId

    const body = { assigned_user, task_date, task_time, is_completed, time_zone, task_msg }

    const headers = {

        headers: authHeader()
    }

    return axios
        .post(endpoint, body, headers)
        .then((response) => {

            return response
        })
}
export const getTask = (taskId) => {
    const data = JSON.parse(localStorage.getItem("data"))

    const companyId = data.results.company_id

    const endpoint = baseUrl + '/' + taskId + "?company_id=" + companyId


    return axios
        .get(endpoint, { headers: authHeader() })

        .then((response) => {

            return response
        })

}

export const editTask = (taskId, assigned_user, task_date, task_time, is_completed, time_zone, task_msg) => {

    const data = JSON.parse(localStorage.getItem("data"))

    const companyId = data.results.company_id

    const endpoint = baseUrl + '/' + taskId + "?company_id=" + companyId
    const body = { assigned_user, task_date, task_time, is_completed, time_zone, task_msg }


    const headers = {

        headers: authHeader()
    }
    return axios
        .put(endpoint, body, headers)
        .then((response) => {

            return response
        })

}
export const deleteTask = (taskId) => {
    const data = JSON.parse(localStorage.getItem("data"))

    const companyId = data.results.company_id

    const endpoint = baseUrl + '/' + taskId + "?company_id=" + companyId

    return axios
        .delete(endpoint, { headers: authHeader() })

        .then((response) => {

            return response
        })

}