
const Comment =     {
    author(parent,args,{ db },info)    { //Below is like Post's Author(User), that's how you read and understand it.
        return db.users.find((user)    =>  {
            return user.id === parent.author
        })
        // Return user object, match User object's Author id with Parents(Posts) Author Id
        // This method will be called for Each Post
    },
    post(parent,args,ctx,info)  {
        return db.posts.find((post)    =>  {
            return post.id === parent.post
        })
    }
}

export { Comment as default }