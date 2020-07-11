import React, { useState, useEffect } from 'react'
import ReactQuill from 'react-quill'

import 'react-quill/dist/quill.snow.css'

const Editor = ({ initialContent }) => {

    const [content, setContent] = useState(initialContent)

    useEffect(() => {
        setContent(initialContent)
    })

    const modules = {
        toolbar: [
            [{ 'font': [] }],
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            [{ 'color': [] }, { 'background': [] }],
            ['link', 'image'],
            ['clean']
        ]
    }
    
    return (
        <ReactQuill 
            id="Quill" 
            theme="snow" 
            modules={modules} 
            value={content}  
            style={{height: '100vh'}} 
        />
    )
}

export default Editor