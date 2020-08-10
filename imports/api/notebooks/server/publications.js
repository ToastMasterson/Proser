import { Meteor } from 'meteor/meteor'
import { Notebooks } from '../notebooks'

Meteor.publish('notebooks', () => {
    if (Meteor.userId()) return Notebooks.find({ author: Meteor.userId() })
    this.ready()
})