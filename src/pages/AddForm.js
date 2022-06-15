import React, { useState, useEffect } from 'react'
import { AddTask, AllUsers } from '../actions/taskManager'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';

import Select from 'react-select';
import './css/AddForm.css'

const AddForm = (props) => {
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [assignUser, setAssignUser] = useState([])
    const [assignUserId, setAssignUserId] = useState('')
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
        this.props.show = false

    }

    const addTask = async (e) => {
        e.preventDefault()
        try {
            const res = await AddTask(localStorage.getItem('assign user id'), date, timeConvert(time), 0, offset, description)
            if (res.type === 'ADD_TASK') {
                setAssignUserId('')
                setDate('')
                setTime('')
                setDescription('')

            }
            else {
                setTimeout(function () {
                    setErrorMessage('Failed to Add Test')
                }, 2500)
            }

        }
        catch {

            setTimeout(function () {
                setErrorMessage('Failed to Add Test')
            }, 2500)
        }

    }
    return (
        <form className='add-task-form'  >
            <p style={{ color: 'red' }}>{errorMessage}</p>
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

            <Dropdown
                isOpen={assign_dropdown}
                toggle={() => setAssign_dropdown(!assign_dropdown)}
                className='dropDown'
            >
                <DropdownToggle caret>
                    {assignUserName === '' &&
                        <div>
                            Select User
                        </div>
                    }
                    {assignUserName}
                </DropdownToggle>
                <DropdownMenu className={assign_dropdown ? 'show' : 'hide'}>
                    {
                        assignUser.map(user =>
                            <DropdownItem className='item' onClick={() => changeUser(user)}>{user.first}</DropdownItem>
                        )
                    }

                </DropdownMenu>
            </Dropdown>




            <div className='add-buttons'>
                <div className='form-action'>
                    <button style={{ color: 'black', background: 'none', border: 'none' }} onClick={(e) => cancel(e)}>Cancel</button>
                    <button disabled={assignUserId === '' || date === "" || time === "" || description === ''} style={{ color: 'white', background: 'green', border: 'green', padding: '0.5em', cursor: 'pointer' }} onClick={(e) => addTask(e)}>Save</button>
                </div>
            </div>

        </form>
    )
}

export default AddForm