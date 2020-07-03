import React from 'react'
import ContentEditable from 'react-contenteditable'

const Title = ({handleTitle, html}) => {

    return (
        <ContentEditable
            html={html}
            onChange={(event) => handleTitle(event.target.value)}
            tagName="h1"
        />
    )
}

export default Title