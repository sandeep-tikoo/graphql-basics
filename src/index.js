import{ GraphQLServer} from 'graphql-yoga'
import { getMaxListeners } from 'cluster'
// import { v1 as uui } from 'uuid'
import { v4 as uuid } from 'uuid'

//Demo user/posts data
const users = [{
        id: uuid(),
        name: 'Sandeep',
        email: 'sandeep@example.com',

    },
    {
        id: uuid(),
        name: 'Arnav',
        email: 'arnav@example.com',
        age: 5
    },
    {
        id: uuid(),
        name: 'Kiran',
        email: 'kiran@example.com',
        age: 33
    }
]
const posts = [{
        id: uuid(),
        title: 'Hello!',
        body: 'How are you doing',
        published: true

    },
    {
        id: uuid(),
        title: 'Heya!',
        body: 'How was your day at school?',
        published: false
    },
    {
        id: uuid(),
        title: 'Hi There!',
        body: 'Are we meeting tonight?',
        published: true
    }
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
    }

    type Post   {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
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
                published: true
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
                return post.title.toLowerCase().includes(args.query.toLowerCase())
            })
            // return users
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