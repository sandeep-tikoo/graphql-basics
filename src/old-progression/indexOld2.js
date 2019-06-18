import{ GraphQLServer} from 'graphql-yoga'

//Type Definitions (Schema)
//if we leave type below without !, it can return null as well
//All Types in GraphQL
//1.String, 2. Boolian, 3. Int 4. Float, 5. ID (to represent unique Identifier) 
const typeDefs = `
    type Query  {
        hello: String!
        currentDate: String! 
        name: String!
        location: String!
        bio: String!
    }
`

//Resolvers

const resolvers =   {
    Query:  {
        hello() {
            return 'This is my first Query'
        },
        currentDate()  {
            return Date()
        },
        name()  {
            return 'Sandeep'
        },
        location()  {
            return 'Australia'
        },
        bio()  {
            return 'I live in Perth'
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