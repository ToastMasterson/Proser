import { Meteor } from 'meteor/meteor'
import { Notebooks } from '../notebooks'

Meteor.methods({
    'notebooks.createNotebookForUser' (userId) {
        console.log(userId, 'userId')
        
        const firstNotebook = Notebooks.insert({
            title: 'My First Notebook',
            author: userId.toString(),
            createdAt: new Date(),
            updatedAt: new Date()
        }, (error, result) => {
            if (error) {
                console.log(error, 'createError')
            } else {
                console.log(result, 'createResult')
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
                console.log(error)
            } else {
                console.log(result)
            }
        })

        return newNotebook
    },

    // 'notebooks.getUserNotebooks' () {
    //     const notebooks = Notebooks.createQuery({
    //         $options: {
    //             sort: {updatedAt: -1}
    //         },
    //         author: this.userId,
    //         notes: {

    //         }
    //     })

    //     console.log(notebooks.fetch())

    //     return notebooks.fetch()
    // }
})