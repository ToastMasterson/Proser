import { Notes } from '../api/notes/notes'

export const noteHelper = async (currentNote) => {

    const noteToUpdate = Notes.findOne({ _id: currentNote.id })

    if (noteToUpdate) {
        const noteForReturn = await Notes.update(noteToUpdate._id, 
            { $set: 
                {
                    title: currentNote.title,
                    content: currentNote.content,
                    updatedAt: new Date(),
                    createdAt: noteToUpdate.createdAt
                }
            }, error => {
                if (error) {
                    console.log(error.reason)
                } else {
                    return noteForReturn
                }
            })
    } else {
        const noteForReturn = await Notes.insert({
            title: currentNote.title,
            content: currentNote.content,
            author: currentNote.author,
            createdAt: new Date()
        }, error => {
            if (error) {
                console.log(error.reason)
            } else {
                return noteForReturn
            }
        })
    }
}