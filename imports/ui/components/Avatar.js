import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

export const Avatar = (user) => {
    return (
        <div className="avatar">
            { user.avatar !== null ? <img src={user.avatar} alt="user-avatar" /> : <FontAwesomeIcon icon={faUser} /> }
        </div>
    )
}
