import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'

export const Notes = new Mongo.Collection('notes')

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
        label: "Updated At"
    }
})

Notes.attachSchema(NotesSchema)