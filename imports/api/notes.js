import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'

export const Notes = new Mongo.Collection('notes')

if (Meteor.isServer) {
    Meteor.publish('notes', function notesPublication() {
        return Notes.find()
    })
}

const NotesSchema = new SimpleSchema({
    title: {
        type: String,
        label: "Title"
    },
    content: {
        type: String,
        label: "Content"
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
        label: "Created At",
        autoValue: function() {
            return new Date()
        }
    },
    updatedAt: {
        type: Date,
        label: "Updated At",
        autoValue: function() {
            return new Date()
        }
    }
})

Notes.attachSchema(NotesSchema)