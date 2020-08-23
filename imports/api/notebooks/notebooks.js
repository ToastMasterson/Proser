import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'
import { Notes } from '../notes/notes'

export const Notebooks = new Mongo.Collection('notebooks')

const NotebooksSchema = new SimpleSchema({

    title: {
        type: String,
        label: 'Title'
    },
    author: {
        type: String,
        label: 'Author',
    },
    createdAt: {
        type: Date,
        label: 'Created At'
    },
    updatedAt: {
        type: Date,
        label: 'Updated At',
        autoValue: function() {
            return new Date()
        }
    }
})

Notebooks.attachSchema(NotebooksSchema)

Notebooks.helpers({

    notes(){
        return Notes.find({ notebookId: this._id})
    }
})