import{ GraphQLServer} from 'graphql-yoga'
import { getMaxListeners } from 'cluster'
// import { v1 as uui } from 'uuid'
import { v4 as uuid } from 'uuid'

//Demo user/posts json data
const users = [ {id: '1',name: 'Sandeep',email: 'sandeep@example.com'},
                {id: '2',name: 'Arnav',email: 'arnav@example.com',age: 5},
                {id: '3',name: 'Kiran',email: 'kiran@example.com',age: 33}]

const posts = [ {id: uuid(),title: 'Hello!',body: 'How are you doing',published: true,author: '3'},
                {id: uuid(),title: 'Heya!',body: 'How was your day at school?',published: false,author: '2'},
                {id: uuid(),title: 'Hi There!',body: 'Are we meeting tonight?',published: true,author: '1'}
              ]

// -------------------------------------------------

// Type Defs
const typeDefs = `
    type Query  {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        me(id: ID): User!
        post: Post!
    }

    type User   {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post]!
    }

    type Post   {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
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
        }
    },
    // If we have to get the data of the custom type among static types, we define new function on root to get the data of that custom property
    Post:   {
        author(parent,args,ctx,info)    {
            return users.find((user)    =>  {
                return user.id === parent.author
            })
            // Return user object, match User object's Author id with Parents(Posts) Author Id
            // This method will be called for Each Post
        }
    },
    User:   {
        posts(parent,args,ctx,info) {
            return posts.find((post) =>   {
                return post.id === parent.id
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