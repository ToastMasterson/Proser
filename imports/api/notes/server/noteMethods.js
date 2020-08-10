import { Meteor } from 'meteor/meteor'
import { Notes } from '../notes'
import { Notebooks } from '../../notebooks/notebooks'

Meteor.methods({
    'notes.createNewNote' (currentNote) {
        
        const newNote = Notes.insert({
            title: currentNote.title,
            content: currentNote.content,
            author: this.userId,
            notebookId: currentNote.notebookId,
            createdAt: new Date(),
            updatedAt: new Date()
        }, (error, result) => {
            if (error !== undefined) {
                console.log(error, 'noteCreateError')
            } else {
                console.log(result, 'noteCreateResult')
                return result
            }
        })
        console.log(newNote, 'newNote')

        return newNote
    },

    'notes.updateNote' (currentNote) {
        console.log(currentNote)

        const noteForReturn = Notes.update(
            { _id: currentNote.id }, 
            { $set: {
                title: currentNote.title,
                content: currentNote.content,
                updatedAt: new Date()
            }
        }, (error, result) => {
            if (error) {
                console.log(error, 'error')
            } else {
                console.log(result, 'updateResult')
                Notebooks.update({ 
                    _id: currentNote.notebookId 
                }, { $set: { updatedAt: new Date() }
                }, (error, result) => {
                    if (error) {
                        console.log(error, 'notebookUpdate')
                    } else {
                        console.log(result, 'notebookUpdate')
                    }
                })
                return result
            }
        })

        console.log(noteForReturn)

        return noteForReturn
    },

    // 'notes.getUserNotes' () {
    //     const notes = Notes.createQuery({
    //         $options: {
    //             sort: {updatedAt: -1}
    //         },
    //         author: this.userId,
    //         // notebooks: {}
    //     })

    //     return notes.fetch()
    // }
})