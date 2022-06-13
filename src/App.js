import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Login } from "./actions/taskManager"
import Loader from './utils/Loader'
import Task from './pages/Task'



const App = (props) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const userLogin = async () => {
    setLoading(true)
    try {
      await dispatch(Login("smithwills1989@gmail.com", "12345678"))
        .then(() => {

          setLoading(false)
        })
    }

    catch {

      alert('failed')
      setLoading(false)

    }
  }
  useEffect(() => {
    userLogin()
  }, [])


  return (
    <React.Fragment>

      {loading ? true &&
        <Loader />
        :
        <Task />

      }
    </React.Fragment>
  )
}


export default App;