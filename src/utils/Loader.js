import React from 'react'
import "./Loader.css"

const Loader = (props) => {
    if (props.loading === false) {
        return null
    }
    return (
        <div className='loader-element'>
            <h1>Loading</h1>

            <div className="lds-hourglass"></div>
        </div>
    )
}

export default Loader