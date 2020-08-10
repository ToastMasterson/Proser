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
    notebookId: {
        type: String,
        label: "Notebook"
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

Notes.attachSchema(NotesSchema)