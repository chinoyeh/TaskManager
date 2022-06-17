import React from 'react'
import './Loader.css'

const CircleLoader = (props) => {
    if (props.loading === false) {
        return null
    }

    else {
        return (
            <div class="lds-ripple"><div></div><div></div></div>
        )
    }
}

export default CircleLoader