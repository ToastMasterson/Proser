import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor'
import { Random } from 'meteor/random'

Accounts.onCreateUser((options, user) => {

    const userToCreate = user
    userToCreate._id = Random.id()

    if (options.profile) {
        userToCreate.profile = options.profile
    }

    Meteor.call('notebooks.createNotebookForUser', userToCreate._id, (error, response) => {
        if (error !== undefined) {
            console.log('notebooks.createNotebookForUser: Error', error)
        } else {
            console.log('notebooks.createNotebookForUser: Success', response)
            return response
        }
    })

    return userToCreate
})