import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

Meteor.methods({
    'user.register' (values) {
        const user = Accounts.createUser({
            email: values.email,
            password: values.password,
            createdAt: new Date(),
            profile: {
                firstName: values.firstName,
                lastName: values.lastName,
                avatar: ''
            }
        })

        this.setUserId(user)
        return user
    }
})