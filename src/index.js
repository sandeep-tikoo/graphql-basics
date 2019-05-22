import{ GraphQLServer} from 'graphql-yoga'
import { getMaxListeners } from 'cluster'
// import { v1 as uui } from 'uuid'
import { v4 as uuid } from 'uuid'

//Demo user/posts json data
const users = [     {id: '1',name: 'Sandeep',email: 'sandeep@example.com'},
                    {id: '2',name: 'Arnav',email: 'arnav@example.com',age: 5},
                    {id: '3',name: 'Kiran',email: 'kiran@example.com',age: 33}]
const posts = [     {id: '1',title: 'Hello!',body: 'How are you doing',published: true, author: '3'},
                    {id: '2',title: 'Heya!',body: 'How was your day at school?',published: false, author: '2'},
                    {id: '3',title: 'Hi There!',body: 'Are we meeting tonight?',published: true, author: '1'}]
const comments = [  {id: uuid(),text: 'Hi this is my first comment to arnav', author: '1', post: '1'},
                    {id: uuid(),text: 'Hi this is my 2nd comment to arnav', author: '1', post: '1'},
                    {id: uuid(),text: 'Hi this is arnavS comment to kiran', author: '2', post: '2'},
                    {id: uuid(),text: 'Hi this is kiranS comment to deepu', author: '3', post: '3'}]
// -------------------------------------------------

// Type Defs
const typeDefs = `
    type Query  {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments(query: String): [Comment!]!
        me(id: ID): User!
        post: Post!
    }

    type User   {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post   {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment    {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }
`

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
                return users
            }
            return users.filter((user)   =>  {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
            // return users
        },
        posts(parent,args,ctx,info) {
            if (!args.query) {
                return posts
            }
            return posts.filter((post)   =>  {
                // return post.title.toLowerCase().includes(args.query.toLowerCase())
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                const isBodyMatch  = post.body.toLowerCase().includes(args.query.toLowerCase())
                console.log(isTitleMatch)
                return isTitleMatch || isBodyMatch
            })
            // return users
        },
        comments(parent,args,ctx,info)    {
            if (!args.query) {
                return comments
            }
            return comments.filter((comment)   =>  {
                return comment.text.toLowerCase().includes(args.query.toLowerCase())
            }) 
            
        }
    },
    // If we have to get the data of the custom type among static types, we define new function on root to get the data of that custom property
    Post: // This is parent always
       {
        author(parent,args,ctx,info)    { //Below is like Post's Author(User), that's how you read and understand it.
            return users.find((user)    =>  {
                return user.id === parent.author // Parent is who provides this fiield actually, here 
            })
            // Return user object, match User object's Author id with Parents(Posts) Author Id
            // This method will be called for Each Post
        },
            comments(parent,args,ctx,info) {
            return comments.filter((comment) =>   { //Difference between filter and Find is Filter is used for array and iterates for each element which Find is used for non array5
                return comment.post === parent.id
            })
        }
    },
    User:   { //below is like User's Posts, thats how you read and understand it.
        posts(parent,args,ctx,info) {
            return posts.filter((post) =>   { //Difference between filter and Find is Filter is used for array and iterates for each element which Find is used for non array5
                return post.author === parent.id
            })
        },
        comments(parent,args,ctx,info)  {
            return comments.filter((comment) => {
                return comment.author === parent.id
            })
        }
    },
    Comment:   {
        author(parent,args,ctx,info)    { //Below is like Post's Author(User), that's how you read and understand it.
            return users.find((user)    =>  {
                return user.id === parent.author
            })
            // Return user object, match User object's Author id with Parents(Posts) Author Id
            // This method will be called for Each Post
        },
        post(parent,args,ctx,info)  {
            return posts.find((post)    =>  {
                return post.id === parent.post
            })
        }
    }
}

const server = new GraphQLServer({
    typeDefs: typeDefs,
    resolvers: resolvers
})

server.start(() =>  {
    console.log('The server up and running!')
    
})