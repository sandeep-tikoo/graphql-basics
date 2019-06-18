import{ GraphQLServer} from 'graphql-yoga'

//Type Definitions (Schema)
//if we leave type below without !, it can return null as well
//All Types in GraphQL
//1.String, 2. Boolian, 3. Int 4. Float, 5. ID (to represent unique Identifier) 
const typeDefs = `
    type Query  {
        id: ID!
        name: String!
        age: Int!
        isEmployed: Boolean!
        gpa: Float

        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        inStock: Boolean!
    }
`

//Resolvers

const resolvers =   {
    Query:  {
        id()    {
            return 'abc123'
        },
        name()  {
            return 'Sandeep Tikoo'
        },
        age()   {
            return 34
        },
        isEmployed()    {
            return true
        },
        gpa()   {
            return 9.02
            // return null
        },

        title()  {
            return 'Avengers movie'
        },
        price() {
            return 9.99
        },
        releaseYear()   {
            return 2019
        },
        rating()    {
            return 8.1
        },
        inStock()   {
            return true
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