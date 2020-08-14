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
                console.log('notes.createNewNote: Error', error)
            } else {
                console.log('notes.createNewNote: Success', result)
                return result
            }
        })

        return newNote
    },

    'notes.updateNote' (currentNote) {

        const noteForReturn = Notes.update(
            { _id: currentNote.id }, 
            { $set: {
                title: currentNote.title,
                content: currentNote.content,
                updatedAt: new Date()
            }
        }, (error, result) => {
            if (error) {
                console.log('notes.updateNote: Error', error)
            } else {
                console.log('notes.updateNote: Success', result)

                Notebooks.update(
                    { _id: currentNote.notebookId }, 
                    { $set: { updatedAt: new Date() } }, (error, result) => {
                        if (error) {
                            console.log('notes.updateNote.updateNotebook: Error', error)
                        } else {
                            console.log('notes.updateNote.updateNotebook: Error', result)
                        }
                    }
                )

                return result
            }
        })

        return noteForReturn
    }
})