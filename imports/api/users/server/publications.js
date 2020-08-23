import { Meteor } from 'meteor/meteor'

Meteor.publish('users', () => {
    return Meteor.users.find()
})

Meteor.publish('user', () => {
    if (!!Meteor.userId()) return Meteor.users.find({ _id: Meteor.userId() })
    this.ready()
})
