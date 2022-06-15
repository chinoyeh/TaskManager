import React, { useState, useEffect } from 'react'

import { Login } from "./actions/taskManager"
import Loader from './utils/Loader'
import Task from './pages/Task'



const App = (props) => {

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [logged, setLogged] = useState(false)
  const userLogin = async () => {
    setLoading(true)
    Login("smithwills1989@gmail.com", "12345678")
      .then((response) => {

        setLoading(false)
        console.log(response.type, 'App response')
        if (response.type === 'LOGIN_SUCESS') {
          setErrorMessage('')
          setLogged(true)

        }
        else {
          setTimeout(function () {
            setErrorMessage('Login Failed')
            setLoading(false)
          }, 2500)
        }

      })




  }
  useEffect(() => {
    userLogin()
  }, [])


  return (
    <React.Fragment>
      {logged === false &&
        <Loader loading={loading} />


      }
      {logged === true &&
        <>
          <p style={{ color: 'red' }}>{errorMessage}</p>
          <Task /></>

      }




    </React.Fragment>
  )
}


export default App;