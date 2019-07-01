import { v4 as uuid } from 'uuid'

const Mutation = {
    createUser(parent,args,{ db },info)    {
        console.log(args)
        const emailTaken = db.users.some((user) =>  user.email === args.data.email) // Check if email is taken by checking one byone in user's array, notice "some" keyword
        if (emailTaken) {
            throw new Error ('Email is in use by someone else!!')
        }

        const user =    { //build user object
            id: uuid(),
            // name: args.name,
            // email: args.email,
            // age: args.age
            ...args.data // transform-object-rest-spread operator, it copies all the attributes of specified object here,in this case of args object
        }
        db.users.push(user) //Add user object to users array.
        return user //Send the current crested user back in response
    },
    deleteUser(parent,args,{ db },info)    {
        const userIndex = db.users.findIndex((user) =>  user.id === args.id) // Check if user is there by checking one by one in user's array, notice "some" keyword
        
        if (userIndex === -1) {
            throw new Error ('User not found, cannot Delete...')
        }

        const deletedUsers = db.users.splice(userIndex,1) //splice method accepts 2 arguments, userindex has the idex of the user and no of items starting the index, 
        //for us just 1, it returns the item to be deleted as well, so we can have a return value as well
        
        db.posts = db.posts.filter((post)  => {
            const match = post.author === args.id

            if (match)  {
                db.comments = db.comments.filter((comment) => comment.post !== post.id)
            }

            return !match
        })
        db.comments = db.comments.filter((comment) =>  comment.author !== args.id)

        return deletedUsers[0]
    },
    updateUser(parent,args,{ db },info)  {
        const {id, data}    = args
        const user = db.users.find((user) => user.id === args.id)

        if (!user)  {
            throw new Error ('User not found, cannot Update...')
        }

        if (typeof data.email === 'string') {
            const emailTaken = db.users.some((user) => user.email === data.email)
            if (emailTaken) {
                throw new Error ('Email in use...')
            }
            user.email = data.email
        } 
        if (typeof data.name === 'string')  {
            user.name = data.name
        }

        if (typeof data.age !== 'undefined')  {
            user.age = data.age
        }

        return user
    },
    createPost(parent,args,{ db },info)    {
        const activeUser = db.users.some((user) =>  user.id === args.data.author) // Check if user is there by checking one by one in user's array, notice "some" keyword
        
        if (!activeUser) {
            throw new Error ('User not found, post failed...' + args.data.author)
        }
        const post =    { //build post object
            id: uuid(),
            // title: args.title,
            // body: args.body,
            // published: args.published,
            // author: args.author
            ...args.data // transform-object-rest-spread operator, it copies all the attributes of specified object here,in this case of args object
        }
        db.posts.push(post) //Add post object to posts array.
        return post //Send the current created post back in response
    },
    deletePost(parent,args,{ db },info)    {
        const postIndex = db.posts.findIndex((post) =>  post.id === args.id) // Check if user is there by checking one by one in user's array, notice "some" keyword
        
        if (postIndex === -1) {
            throw new Error ('Post not found, cannot Delete...')
        }

        const deletedPosts = db.posts.splice(postIndex,1) //splice method accepts 2 arguments, userindex has the idex of the user and no of items starting the index, 
        //for us just 1, it returns the item(s) to be deleted as well, so we can have a return value as well

        return deletedPosts[0]
    },
    updatePost(parent,args,{ db },info)  {
        const {id, data}    = args
        const post = db.posts.find((post) => post.id === args.id)

        if (!post)  {
            throw new Error ('Post not found, cannot Update...')
        }

        if (typeof data.title === 'string') {
            post.title = data.title
        } 
        if (typeof data.body === 'string')  {
            post.body = data.body
        }

        if (typeof data.published === 'boolean')  {
            post.published = data.published
        }

        return post
    },
    createComment(parent,args,{ db },info) {
        const activeUser = db.users.some((user) =>  user.id === args.data.author) // Check if user is there by checking one by one in users array, notice "some" keyword
        const activePost = db.posts.some((post) =>  post.id === args.data.post && post.published) // Check if post is there  and published = true by checking one by one in posts array, notice "some" keyword

        if (!activeUser)    {
            throw new Error ('User not found, comment failed...')
        }
        if (!activePost)    {
            throw new Error ('Post not found, comment failed...')
        }

        const comment = { //build comment object
            id: uuid(),
            // text: args.text,
            // author: args.author,
            // post: args.post
            ...args.data // transform-object-rest-spread operator, it copies all the attributes of specified object here,in this case of args object
        }
        
        db.comments.push(comment) // add comment object to comments array
        return comment // return the current created comment object back in response
    },
    deleteComment(parent,args,{ db },info)    {
        const commentIndex = db.comments.findIndex((comment) =>  comment.id === args.id) // Check if user is there by checking one by one in user's array, notice "some" keyword
        
        if (commentIndex === -1) {
            throw new Error ('Post not found, cannot Delete...')
        }

        const deletedComments = db.comments.splice(commentIndex,1) //splice method accepts 2 arguments, userindex has the idex of the user and no of items starting the index, 
        //for us just 1, it returns the item to be deleted as well, so we can have a return value as well

        return deletedComments[0]
    },
    updateComment(parent,args,{ db },info)  {
        const {id, data}    = args
        const comment = db.comments.find((comment) => comment.id === args.id)

        if (!comment)  {
            throw new Error ('comment not found, cannot Update...')
        }

        if (typeof data.text === 'string') {
            comment.text = data.text
        } 

        return comment

    }

}

export { Mutation as default }