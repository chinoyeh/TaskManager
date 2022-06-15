import React from 'react'
import './Loader.css'

const CircleLoader = (props) => {
    if (props.loading === false) {
        return null
    }

    else {
        return (
            <div class="loader"></div>
        )
    }
}

export default CircleLoader