import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'

export const Notebooks = new Mongo.Collection('notebooks')

if (Meteor.isServer) {
    Meteor.publish('notebooks', function notebooksPublication() {
        return Notebooks.find()
    })
}

const NotebooksSchema = new SimpleSchema({
    title: {
        type: String,
        label: "Title"
    },
    author: {
        type: String,
        label: "Author",
        autoValue: function() {
            return this.userId
        }
    },
    createdAt: {
        type: Date,
        label: "Created At"
    },
    updatedAt: {
        type: Date,
        label: "Updated At",
        autoValue: function() {
            return new Date()
        }
    }
})

Notebooks.attachSchema(NotebooksSchema)