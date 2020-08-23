import { Meteor } from 'meteor/meteor'
import { Notes } from '../notes'

Meteor.publish('notes', () => {
    if (Meteor.userId()) return Notes.find({ author: Meteor.userId() })
    this.ready()
})