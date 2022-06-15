import React, { useEffect, useState } from 'react'
import { GetTask, EditTask, DeleteTask, AllUsers } from '../actions/taskManager'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import './css/AddForm.css'

const EditForm = (props) => {
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [assignUser, setAssignUser] = useState([])
    const [assignUserId, setAssignUserId] = useState('')
    const [taskDetails, setTaskDetails] = useState([])
    const [showPage, setShowPage] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const [assign_dropdown, setAssign_dropdown] = useState(false)
    const [assignUserName, setAssignUserName] = useState('')



    const getAllUsers = async () => {
        try {
            const data = await AllUsers()
            setAssignUser(data.payload.data)
        }
        catch {
            setTimeout(function () {
                setErrorMessage('Failed to load Assigned Users')
            })
        }
    }
    const timeConvert = (time) => {
        let hours = (time.slice(0, 2)) * 3600
        let minutes = (time.slice(3)) * 60

        return (hours + minutes)
    }
    const offset = Math.abs((new Date()).getTimezoneOffset() * 60)
    const changeUser = (user) => {
        setAssignUserId(user.id)
        setAssignUserName(user.first)
    }
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

            setTaskDetails(res.payload)
        }
        catch {
            setErrorMessage('Failed to load task')
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
            if (res.type === 'DELETE_TASK') {


            }
            else {
                setTimeout(function () {
                    setErrorMessage('Failed to Delete Test')
                }, 2500)
            }

        }
        catch {

            setTimeout(function () {
                setErrorMessage('Delete to Edit Test')
            }, 2500)
        }

    }
    const editTask = async (e) => {
        e.preventDefault()
        const taskId = JSON.parse(localStorage.getItem("task_id"))
        try {
            const res = await EditTask(taskId, assignUserId, date, timeConvert(time), 0, offset, description)

            if (res.type === 'EDIT_TASK') {


            }
            else {
                setTimeout(function () {
                    setErrorMessage('Failed to Edit Test')
                }, 2500)
            }

        }
        catch {

            setTimeout(function () {
                setErrorMessage('Failed to Edit Test')
            }, 2500)
        }
    }
    if (props.show === false) {
        return null
    }
    return (
        <form className={showPage === true ? 'add-task-form' : 'close'}>
            <p style={{ color: 'red' }}>{errorMessage}</p>
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

            <Dropdown
                isOpen={assign_dropdown}
                toggle={() => setAssign_dropdown(!assign_dropdown)}
                className='dropDown'
            >
                <DropdownToggle caret>

                    {assignUserName || taskDetails.assigned_user}
                </DropdownToggle>
                <DropdownMenu className={assign_dropdown ? 'show' : 'hide'}>
                    {
                        assignUser.map(user =>
                            <DropdownItem className='item' onClick={() => changeUser(user)}>{user.first}</DropdownItem>
                        )
                    }

                </DropdownMenu>
            </Dropdown>



            <div className='form-buttons'>
                <button onClick={(e) => deleteTask(e)} style={{ color: 'black', background: 'none', border: 'none' }}><i className="fa fa-trash-alt"></i></button>
                <div className='form-action'>
                    <button style={{ color: 'black', background: 'none', border: 'none' }} onClick={(e) => cancel(e)}>Cancel</button>
                    <button style={{ color: 'white', background: 'green', border: 'green', padding: '0.5em' }} onClick={(e) => editTask(e)}>Edit</button>
                </div>
            </div>

        </form>
    )
}

export default EditForm