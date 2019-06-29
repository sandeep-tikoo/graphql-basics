const Post = {
// If we have to get the data of the custom type among static types, we define new function on root to get the data of that custom property
// This is parent always

    author(parent,args,{ db },info)    { //Below is like Post's Author(User), that's how you read and understand it.
        return db.users.find((user)    =>  {
            return user.id === parent.author // Parent is who provides this fiield actually, here 
        })
        // Return user object, match User object's Author id with Parents(Posts) Author Id
        // This method will be called for Each Post
    },
        comments(parent,args,{ db },info) {
        return db.comments.filter((comment) =>   { //Difference between filter and Find is Filter is used for array and iterates for each element which Find is used for non arrays
            return comment.post === parent.id
        })
    }
}

export { Post as default }