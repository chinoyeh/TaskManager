import React from 'react'
import "./Loader.css"

const Loader = (props) => {
    if (props.loading === false) {
        return null
    }
    return (
        <div className='loader-element'>
            <h1>Loading</h1>
            <div className='loader-box'>
                <div className='loader-box-1'>

                </div>
                <div className='loader-box-2'>

                </div>
                <div className='loader-box-3'>

                </div>
            </div>
        </div>
    )
}

export default Loader