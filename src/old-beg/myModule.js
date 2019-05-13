//Export Types:- 
//Named exports, has a name . Can export as many as needed.
//Default Exports - Has no name - You can use only one.

const message = 'message from myModule.js'

const name = 'Sandeep'

const location = 'Perth'

const getGreeting = (name) => {
    return `Welcome to the course ${name}`
}

export {message, name, getGreeting, location as default}