import React, { useEffect, useState } from 'react'
import { GetTask, EditTask, DeleteTask, AllUsers } from '../actions/taskManager'
import './css/AddForm.css'

const EditForm = (props) => {
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [assignUser, setAssignUser] = useState([])
    const [assignUserId, setAssignUserId] = useState('')
    const [taskDetails, setTaskDetails] = useState([])
    const [showPage, setShowPage] = useState(true)
    const tog_page = () => {
        setShowPage(!showPage)
    }

    const getAllUsers = async () => {
        try {
            const data = await AllUsers()
            console.log(data)
            setAssignUser(data.payload.data)
        }
        catch {
            console.log("getat")
        }
    }
    const timeConvert = (time) => {
        let hours = (time.slice(0, 2)) * 3600
        let minutes = (time.slice(3)) * 60

        return (hours + minutes)
    }
    const offset = Math.abs((new Date()).getTimezoneOffset() * 60)
    const cancel = (e) => {
        e.preventDefault()
        setAssignUserId('')
        setDate('')
        setTime('')
        setDescription('')
    }

    const getTask = async () => {
        const taskId = JSON.parse(localStorage.getItem("task_id"))
        try {
            const res = await GetTask(taskId)
            console.log(res, 'res')
            setTaskDetails(res)
        }
        catch {

            alert('failed')
        }
    }
    useEffect(() => {
        getAllUsers()
        getTask()
    }, [])
    const deleteTask = async (e) => {
        e.preventDefault()
        const taskId = JSON.parse(localStorage.getItem("task_id"))
        try {
            const res = await DeleteTask(taskId)
            console.log(res, 'res')
            tog_page()
        }
        catch {
            alert('failed')
            tog_page()
        }

    }
    const editTask = async (e) => {
        e.preventDefault()
        const taskId = JSON.parse(localStorage.getItem("task_id"))
        try {
            const res = await EditTask(taskId, assignUserId, date, timeConvert(time), 0, offset, description)

        }
        catch {

            alert('failed')
        }
    }
    if (props.show === false) {
        return null
    }
    return (
        <form className={showPage === true ? 'add-task-form' : 'close'}>
            <label htmlFor='description'>
                Task description
            </label>
            <input type="text" value={description || taskDetails.task_msg} onChange={(e) => setDescription(e.target.value)} />
            <div className='date-time'>
                <label className='date' htmlFor='date'>
                    <p>Date</p>
                    <input type="date" value={date || taskDetails.task_date} onChange={(e) => setDate(e.target.value)} />
                </label>

                <label className='time' htmlFor='time'>
                    <p>Time</p>
                    <input type="time" value={time || taskDetails.task_time} onChange={(e) => setTime(e.target.value)} />
                </label>

            </div>
            <label htmlFor='assigned-user'>
                Assign User
            </label>

            <div className='assign'>
                {assignUser.map((user) => {
                    return (<h1 key={user.id} onClick={() => {
                        setAssignUserId(user.id)
                        console.log(assignUserId)
                    }}>{user.first}</h1>)
                })

                }
            </div>



            <div className='form-buttons'>
                <button onClick={(e) => deleteTask(e)} style={{ color: 'black', background: 'none', border: 'none' }}><i className="fa fa-trash-alt"></i></button>
                <div className='form-action'>
                    <button style={{ color: 'black', background: 'none', border: 'none' }} onClick={(e) => cancel(e)}>Cancel</button>
                    <button style={{ color: 'white', background: 'green', border: 'green', padding: '0.5em' }} onClick={(e) => editTask(e)}>Save</button>
                </div>
            </div>

        </form>
    )
}

export default EditForm