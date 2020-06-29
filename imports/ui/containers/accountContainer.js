import React from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'

export const accountContainer = withTracker(() => {
    const user = Meteor.isServer ? null : Meteor.user()
    const userId = Meteor.isServer ? null : Meteor.userId()
    return { account: {
        user,
        userId,
        isLoggedIn: !!userId
    }}
})