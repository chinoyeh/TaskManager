import React, { useState, useEffect } from 'react'
import { GetAllTask, AddTask, AllUsers, GetTask, EditTask, DeleteTask, } from '../actions/taskManager'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Modal, ModalBody } from 'reactstrap';
import SuccessNotification from '../utils/SuccessNotification';
import ErrorNotification from '../utils/ErrorNotification';

import './css/Task.css'
import './css/AddForm.css'

import CircleLoader from '../utils/CircleLoader'


const Task = () => {

    const [allTask, setAllTask] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [taskDetails, setTaskDetails] = useState([])
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [taskId, setTaskId] = useState('')
    const [time, setTime] = useState('')
    const [assignUser, setAssignUser] = useState([])
    const [assignUserId, setAssignUserId] = useState('')
    const [modalSuccess, setModalSuccess] = useState(false)
    const [modalData, setModalData] = useState('')
    const [modalError, setModalError] = useState(false)
    const [assign_dropdown, setAssign_dropdown] = useState(false)
    const [assignUserName, setAssignUserName] = useState('')
    const success = (res) => {
        if (res !== null) {
            modalSuccess(true)
            setTimeout(function () {
                setModalSuccess(false)
                setModalData('')
            }, 2500)
        }
        else if (res.data = 'error') {
            modalError(true)
            setTimeout(function () {
                setModalError(false)
                setModalData('')

            }, 2500)
        }
    }
    const tog_add = () => {
        setShowForm(!showForm)
    }

    const forceUpdate = React.useCallback(() => setTaskId(), []);
    const Tog_edit = () => {

        setShowEdit(!showEdit)




    }
    useEffect(() => {
        getTask()
    }, [taskId])

    const getAllTask = async () => {
        setLoading(true)
        try {

            const data = await GetAllTask()

            if (data.type === 'GET_ALL_TASK') {
                setLoading(false)
                setAllTask(data.payload)
            }
            else {
                setLoading(false)
                setAllTask([])
                setTimeout(function () {
                    setErrorMessage('Failed to load task')
                }, 2500)
            }

        }

        catch {

            setLoading(false)
            setTimeout(function () {
                setErrorMessage('Check your Internet Connection')
            }, 2500)



        }

    }

    useEffect(() => {
        getAllTask()



    }, [])





    const getAllUsers = async () => {
        try {
            const data = await AllUsers()

            setAssignUser(data.payload.data)
        }
        catch {
            setTimeout(function () {
                setErrorMessage('Failed to load Assigned Users')
            }, 2500)
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

    // if (props.show === false) {
    //     return null
    // }

    const offset = Math.abs((new Date()).getTimezoneOffset() * 60)
    const changeUser = (user) => {
        setAssignUserId(user.id)
        setAssignUserName(user.first)
        localStorage.setItem('assign user id', (user.id))
    }
    const cancel = (e) => {
        e.preventDefault()
        setAssignUserId('')
        setDate('')
        setTime('')
        setDescription('')
        tog_add()



    }

    const addTask = async (e) => {
        e.preventDefault()
        try {
            const res = await AddTask(localStorage.getItem('assign user id'), date, timeConvert(time), 0, offset, description)

            console.log(res)
            if (res.type === 'ADD_TASK') {
                setAssignUserId('')
                setDate('')
                setTime('')
                setDescription('')
                setModalData('Task Added Successfully')
                tog_add()

            }
            else {

            }

        }
        catch {

            setTimeout(function () {
                setErrorMessage('Failed to Add Task')
            }, 2500)
        }

    }









    const cancelEdit = (e) => {
        e.preventDefault()
        setAssignUserId('')
        setDate('')
        setTime('')
        setDescription('')
        Tog_edit()

    }

    const getTask = async () => {

        console.log(taskId)
        try {
            const res = await GetTask(taskId)

            setTaskDetails(res.payload)
        }
        catch {
            setTimeout(function () {
                setErrorMessage('Failed to Load Task')
            }, 2500)
        }
    }
    useEffect(() => {
        getAllUsers()

    }, [])
    const deleteTask = async (e) => {
        e.preventDefault()

        try {
            const res = await DeleteTask(taskId)

            if (res.type === 'DELETE_TASK') {
                Tog_edit()
                getAllTask()
                setModalData('Task deleted Successfully')

            }
            else {
                setModalData('Task was not Deleted')
            }

        }
        catch {

            setTimeout(
                setErrorMessage('Kindly Check your Internet')
                , 2500)
        }

    }
    const editTask = async (e) => {
        e.preventDefault()
        const taskId = JSON.parse(localStorage.getItem("task_id"))
        try {
            const res = await EditTask(taskId, assignUserId, date, timeConvert(time), 0, offset, description)

            if (res.type === 'EDIT_TASK') {

                Tog_edit()
                getAllTask()
            }
            else {
                setTimeout(function () {
                    setErrorMessage('Failed to Edit Test')
                }, 2500)
            }

        }
        catch {

            setTimeout(function () {
                setErrorMessage('Failed to Edit Task')
            }, 2500)
        }
    }
    return (
        <div className='container'>

            <div className='loader-circle'>
                <h1>Task-Manager <i className="fa fa-tasks" ></i></h1>
                < CircleLoader loading={loading} />
            </div>



            <div className='task-box'>

                <h2>Task <span>{allTask.length}</span></h2>


                <button onClick={tog_add}><i className='fa fa-plus'></i></button>


            </div>
            <Modal size="lg" style={{ maxWidth: '600px', width: '100%', }}
                isOpen={showForm}
                toggle={tog_add}
                centered={true}
                className="access-level-modal"
            >
                <ModalBody className="reset-password " style={{ margin: 'auto' }}>
                    <form className='add-task-form'  >
                        <h1>Add Task</h1>
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
                            <DropdownMenu className={assign_dropdown ? 'showList' : 'hide'}>
                                {
                                    assignUser.map(user =>
                                        <DropdownItem className='item' onClick={() => changeUser(user)}>{user.first}</DropdownItem>
                                    )
                                }

                            </DropdownMenu>
                        </Dropdown>




                        <div className='add-buttons'>
                            <div className='form-action'>
                                <button style={{ color: 'black', background: 'none', border: '1px solid rgb(168, 223, 195)', padding: '0.7em', cursor: 'pointer', borderRadius: '10px', width: '7em', marginRight: '2em' }} onClick={(e) => cancel(e)}>Cancel</button>
                                <button disabled={assignUserId === '' || date === "" || time === "" || description === ''} style={{ color: 'white', background: 'rgb(168, 223, 195)', border: 'rgb(168, 223, 195)', padding: '0.7em', cursor: 'pointer', borderRadius: '10px', width: '7em', margin: '1em auto' }} onClick={(e) => addTask(e)}>Save</button>
                            </div>
                        </div>

                    </form>
                </ModalBody>
            </Modal>

            {showForm === false && showEdit == false &&
                <div className='task-list'>

                    <p style={{ color: 'red', fontSize: 'bold' }}>{errorMessage} </p>





                    {allTask.map((task) => {
                        return (
                            <div key={task.id} className='task-element'>


                                <div className='task-details'>
                                    <h3>{task.task_msg}</h3>
                                    <h3 style={{ color: 'rgb(168, 223, 195)', fontFamily: 'cursive', fontWeight: '600', fontSize: '0.7em' }}>{task.task_date}</h3>
                                </div>
                                <div className='task-button'>
                                    <button onClick={() => {

                                        setTaskId(task.id)
                                            ; setShowEdit(!showEdit)
                                    }}><i className="fa fa-edit"></i></button>
                                    <button><i className="fa fa-check"></i></button>
                                    <button><i className="fa fa-archive"></i></button>
                                </div>

                            </div>
                        )
                    })

                    }

                </div>
            }

            <Modal
                isOpen={showEdit}
                toggle={Tog_edit}
            >
                <ModalBody>
                    <form className='add-task-form' >
                        <h1>Edit Task</h1>
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
                            <DropdownMenu className={assign_dropdown ? 'showList' : 'hide'}>
                                {
                                    assignUser.map(user =>
                                        <DropdownItem className='item' onClick={() => changeUser(user)}>{user.first}</DropdownItem>
                                    )
                                }

                            </DropdownMenu>
                        </Dropdown>



                        <div className='form-buttons'>
                            <button onClick={(e) => deleteTask(e)} style={{ color: 'rgb(168, 223, 195)', background: 'none', border: 'none', cursor: 'pointer' }}><i className="fa fa-trash-alt"></i></button>
                            <div className='form-action'>
                                <button style={{ color: 'black', background: 'none', border: '1px solid rgb(168, 223, 195)', padding: '0.7em', cursor: 'pointer', borderRadius: '10px', width: '7em', marginRight: '2em' }} onClick={(e) => cancelEdit(e)}>Cancel</button>
                                <button style={{ color: 'white', background: 'rgb(168, 223, 195)', border: 'rgb(168, 223, 195)', padding: '0.7em', cursor: 'pointer', borderRadius: '10px', width: '7em', margin: '1em auto' }} onClick={(e) => editTask(e)}>Edit</button>
                            </div>
                        </div>

                    </form>
                </ModalBody>
            </Modal>
            <SuccessNotification modalState={modalSuccess}>{modalData}</SuccessNotification>
            <ErrorNotification modalState={modalError}>{modalData}</ErrorNotification>
        </div>
    )
}

export default Task