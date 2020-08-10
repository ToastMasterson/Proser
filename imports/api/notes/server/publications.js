import { Meteor } from 'meteor/meteor'
import { Notes } from '../notes'

Meteor.publish('notes', () => {
    if (Meteor.userId()) return Notes.find({ author: Meteor.userId() })
    // if ( Meteor.userId() ) {
    //     return Notes.createQuery({
    //         $options: {
    //             sort: {updatedAt: -1}
    //         },
    //         author: Meteor.userId(),
    //         notebooks: {}
    //     }).fetch()
    // }
    this.ready()
})