import { Meteor } from 'meteor/meteor'
import { Notebooks } from '../notebooks'
import { Notes } from '../../notes/notes'

Meteor.methods({

    'notebooks.createNotebookForUser' (userId) {
        
        const firstNotebook = Notebooks.insert({
            title: 'My First Notebook',
            author: userId.toString(),
            createdAt: new Date(),
            updatedAt: new Date()
        }, (error, result) => {
            if (error) {
                console.log('notebooks.createNotebookForUser: Error', error)
            } else {
                console.log('notebooks.createNotebookForUser: Success', result)
                return result
            }
        })

        return firstNotebook
    },

    'notebooks.addNewNotebook' (title) {
        const newNotebook = Notebooks.insert({
            title: title.title,
            author: this.userId,
            createdAt: new Date(),
            updatedAt: new Date()
        }, (error, result) => {
            if (error) {
                console.log('notebooks.addNewNotebook: Error', error)
            } else {
                console.log('notebooks.addNewNotebook: Success', result)
            }
        })

        return newNotebook
    },

    'notebooks.renameNotebook' (notebookId, newTitle) {
        const notebookToReturn = Notebooks.update(
            { _id: notebookId }, { $set: { title: newTitle, updatedAt: new Date() }}, (error, result) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log(result, 'Notebook Renamed')
                    return result
                }
        })
        return notebookToReturn
    },

    'notebooks.deleteNotebook' (notebookId) {

        const notebookToDelete = Notebooks.findOne({ _id: notebookId })

        if (notebookToDelete !== undefined) {
            const notes = Notes.find({ notebookId: notebookId }).fetch()
            console.log(notes, 'notes')
            Notes.update(
                { notebookId: notebookId }, { $set: { isDeleted: true, updatedAt: new Date() }}, { multi: true }, (error, result) => {
                    if (error) {
                        console.log(error, 'updateerror')
                    } else {
                        Notebooks.remove({ _id: notebookId }, error => {
                            if ( error ) return error
                        })
                        return result
                    }
            })
        } else {
            return 'Notebook does not exist'
        }
    }
})