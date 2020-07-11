import { withTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { Notes } from '../../api/notes/notePublications'

export const accountContainer = withTracker(() => {
    Meteor.subscribe('notes')
    Meteor.subscribe('notebooks')
    
    const user = Meteor.isServer ? null : Meteor.user()
    const userId = Meteor.isServer ? null : Meteor.userId()
    const notes =  Notes.find({ author: Meteor.userId() }, { sort: { updatedAt: -1 }}).fetch()
    return { account: {
        user,
        userId,
        notes,
        isLoggedIn: !!userId
    }}
})