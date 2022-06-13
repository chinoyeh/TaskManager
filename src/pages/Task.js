import React, { useState, useEffect } from 'react'
import { GetAllTask } from '../actions/taskManager'
import { useSelector, useDispatch } from "react-redux"
import './css/Task.css'
import AddForm from './AddForm'
import EditForm from './EditForm'


const Task = () => {

    const [allTask, setAllTask] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [showEdit, setShowEdit] = useState(false)

    const tog_add = () => [
        setShowForm(!showForm)
    ]
    const getAllTask = async () => {
        try {
            const data = await GetAllTask()
            console.log(data)
            if (data.type === 'GET_ALL_TASK') {

                setAllTask(data.payload)
            }
            else {
                setAllTask([])
            }

        }

        catch {


            alert('failed')


        }

    }

    useEffect(() => {
        getAllTask()

    }, [])
    return (
        <React.Fragment>
            <div className='task-box'>
                <h2>Task <span>{allTask.length}</span></h2>

                <button onClick={tog_add}>+</button>

            </div>
            <AddForm show={showForm} />
            <div className='task-list'>
                {allTask.map((task) => {
                    return (
                        <div key={task.id} className='task-element'>


                            <div className='task-details'>
                                <h3>{task.task_msg}</h3>
                                <h3>{task.task_date}</h3>
                            </div>
                            <div className='task-button'>
                                <button onClick={() => { localStorage.setItem("task_id", JSON.stringify(task.id)); setShowEdit(!showEdit) }}><i className="fa fa-edit"></i></button>
                                <button><i className="fa fa-check"></i></button>
                                <button><i className="fa fa-archive"></i></button>
                            </div>

                        </div>
                    )
                })

                }
                <EditForm show={showEdit} />
            </div>
        </React.Fragment>
    )
}

export default Task