import{ GraphQLServer} from 'graphql-yoga'
import { getMaxListeners } from 'cluster';

//Types in GraphQL
//1.String, 2. Boolian, 3. Int 4. Float, 5. ID (to represent unique Identifier) 
//convention Uppercase first letter for custom types in Graphql
const typeDefs = `
    type Query  {
        me: User!
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
        me()    {
            return {
                id: '123098',
                name: 'Sandeep Tikoo',
                email: 'san.tik@example.com',
                age: 28
            }
        },
        post()    {
            return {
                id: '444098',
                title: 'Heya!',
                body: 'How are you doing today?',
                published: true
            }
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