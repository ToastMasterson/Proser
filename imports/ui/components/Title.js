import React, { useState, useEffect } from 'react'
import ContentEditable from 'react-contenteditable'

const Title = ({initialTitle}) => {

    const [title, setTitle] = useState(initialTitle)

    useEffect(() => {
        setTitle(initialTitle)
    })

    return (
        <ContentEditable
            id="Title"
            html={title}
            tagName="h1"
            style={{outline: '0px solid transparent'}} />
    )
}

export default Title