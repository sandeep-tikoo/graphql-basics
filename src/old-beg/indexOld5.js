import{ GraphQLServer} from 'graphql-yoga'
import { getMaxListeners } from 'cluster'
// import { v1 as uui } from 'uuid'
import { v4 as uuid } from 'uuid'

//Types in GraphQL
//1.String, 2. Boolian, 3. Int 4. Float, 5. ID (to represent unique Identifier) 
//convention Uppercase first letter for custom types in Graphql
const typeDefs = `
    type Query  {
        greeting(name: String, position: String): String!
        me: User!
        post: Post!
        add(numbers: [Float!]): Float!
        grades: [Int!]!
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
        me()    {
            return {
                id: uuid(),
                name: 'Sandeep Tikoo',
                email: 'san.tik@example.com',
                age: 28
            }
        },
        post()    {
            return {
                id: uuid(),
                title: 'Heya!',
                body: 'How are you doing today?',
                published: true
            }
        },
        // Resolver functions receive 4 types of arguments when invoked by client
        //1. parent - ?
        //2. args - Arguments
        //3. ctx - Context
        //4. info - >
        greeting(parent, args, ctx, info)    {
            if (args.name && args.position)    {
                console.log('both!')
                return `Hello,  ${args.name}, position.. ${args.position}! `
            } else if (args.name)  {
                console.log('name!')
                return `Hello,  ${args.name}!`
            } else if (args.position) {
                console.log('position!')
                return 'Hello ' + args.position
            } else  {
                console.log('none!')
                return 'Hello!'
            }
        },
        add(parent, args, ctx, info)  {
            if (args.numbers.length === 0)    {
                return 0
            } else  {

                return args.numbers.reduce((accumulator, currentValue)  =>  {
                    return accumulator + currentValue
                })
            }
            
        },
        grades(parent, args, ctx, info)    {
            return [99,80,93]
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