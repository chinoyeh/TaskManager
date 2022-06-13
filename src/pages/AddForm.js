import React, { useState, useEffect } from 'react'
import { AddTask, AllUsers } from '../actions/taskManager'
import { useSelector, useDispatch } from "react-redux"
import './css/AddForm.css'

const AddForm = (props) => {
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [assignUser, setAssignUser] = useState([])
    const [assignUserId, setAssignUserId] = useState('')

    const dispatch = useDispatch()

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
        let hours = (time.slice(0, 2)) * 60
        let minutes = (time.slice(3)) * 60

        return (hours + minutes)
    }
    useEffect(() => {
        getAllUsers()
    }, [])

    if (props.show === false) {
        return null
    }

    const offset = Math.abs((new Date()).getTimezoneOffset() * 60)
    const cancel = (e) => {
        e.preventDefault()
        setAssignUserId('')
        setDate('')
        setTime('')
        setDescription('')
    }

    const addTask = async (e) => {
        e.preventDefault()
        try {
            const res = await AddTask(assignUserId, date, timeConvert(time), 0, offset, description)
            console.log(res, 'response')

        }
        catch {

            alert('failed')
        }

    }
    return (
        <form className='add-task-form'>
            <label htmlFor='description'>
                Task description
            </label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            <div className='date-time'>
                <label className='date' htmlFor='date'>
                    <p>Date</p>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </label>

                <label className='time' htmlFor='time'>
                    <p>Time</p>
                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                </label>

            </div>
            <label htmlFor='assigned-user'>
                Assign User
            </label>

            {assignUser.map((user) => {
                return (<h1 key={user.id} onClick={() => {
                    setAssignUserId(user.id)
                    console.log(assignUserId)
                }}>{user.first}</h1>)
            })

            }



            <div className='add-buttons'>
                <div className='form-action'>
                    <button style={{ color: 'black', background: 'none', border: 'none' }} onClick={(e) => cancel(e)}>Cancel</button>
                    <button style={{ color: 'white', background: 'green', border: 'green', padding: '0.5em' }} onClick={(e) => addTask(e)}>Save</button>
                </div>
            </div>

        </form>
    )
}

export default AddForm