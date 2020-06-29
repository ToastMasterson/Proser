import { Accounts } from 'meteor/accounts-base'

Accounts.config({
    loginExpirationInDays: 90
})

// Accounts.ui.config({
//     passwordSignupFields: 'USERNAME_ONLY'
// })