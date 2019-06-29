import{ GraphQLServer} from 'graphql-yoga'
// import { v1 as uui } from 'uuid'
import { v4 as uuid } from 'uuid'
import db from './db'



//Resolvers

const resolvers =   {
    Query:  {
        me(parent,args,ctx,info)    {
            if (args.id === '1')   {
                return {
                    id: 1,
                    name: 'Sandeep Tikoo',
                    email: 'san.tik@example.com',
                    age: 28
                }
            } else  {
                return {
                    id: 'default id',
                    name: 'Sandeep Tikoo',
                    email: 'san.tik@example.com',
                    age: 28
                }
            }
        },
        post(parent,args,ctx,info)    {
            return {
                id: uuid(),
                title: 'Heya!',
                body: 'How are you doing today?',
                published: true,
                author: User
            }
        },
        users(parent,args,ctx,info) {
            if (!args.query) {
                return ctx.db.users   //since we are now getting users property in ctx.db, hence using ctx.db.users earlier it was just users when users array was part of index.js
            }
            return ctx.db.users.filter((user)   =>  {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
            // return users
        },
        posts(parent,args,{ db },info) {
            if (!args.query) {
                return db.posts
            }
            return db.posts.filter((post)   =>  {
                // return post.title.toLowerCase().includes(args.query.toLowerCase())
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                const isBodyMatch  = post.body.toLowerCase().includes(args.query.toLowerCase())
                console.log(isTitleMatch)
                return isTitleMatch || isBodyMatch
            })
            // return users
        },
        comments(parent,args,{ db },info)    {
            if (!args.query) {
                return db.comments
            }
            return db.comments.filter((comment)   =>  {
                return comment.text.toLowerCase().includes(args.query.toLowerCase())
            }) 
            
        }
    },
    Mutation:   {
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
        }

    },
    // If we have to get the data of the custom type among static types, we define new function on root to get the data of that custom property
    Post: // This is parent always
       {
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
    },
    User:   { //below is like User's Posts, thats how you read and understand it.
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
    },
    Comment:   {
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
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: resolvers,
    context:    { // Context will have objects external to app which are shared with the app, like DB, Authentication, etc
        db: db
    }
})

server.start(() =>  {
    console.log('The server up and running!')
    
})