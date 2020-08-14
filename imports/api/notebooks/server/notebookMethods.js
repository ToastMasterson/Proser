import { Meteor } from 'meteor/meteor'
import { Notebooks } from '../notebooks'

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
            if (error !== undefined) {
                console.log('notebooks.addNewNotebook: Error', error)
            } else {
                console.log('notebooks.addNewNotebook: Success', result)
            }
        })

        return newNotebook
    }
})