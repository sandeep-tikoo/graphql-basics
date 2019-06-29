
const User = { //below is like User's Posts, thats how you read and understand it.
    posts(parent,args,{ db },info) {
        return db.posts.filter((post) =>   { 
            return post.author === parent.id
        })
    },
    comments(parent,args,{ db },info)  {
        return db.comments.filter((comment) => {
            return comment.author === parent.id
        })
    }
}

export { User as default }