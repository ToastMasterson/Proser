import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const Editor = () => {

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
        <ReactQuill theme="snow" modules={modules} style={{height: '100%'}} />
    )
}

export default Editor