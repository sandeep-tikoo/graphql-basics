import{ GraphQLServer} from 'graphql-yoga'
import db from './db'
import Query from    './resolvers/Query'
import Mutation from './resolvers/Mutation'
import User from     './resolvers/User'
import Post from     './resolvers/Post'
import Comment from  './resolvers/Comment'

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: { //importing above and here telling Graphql Server that below are the resolver objects - Sandeep
        Query,
        Mutation,
        User,
        Post,
        Comment
    },
    context:    { // Context will have objects external to app which are shared with the app, like DB, Authentication, etc
        db: db
    }
})

server.start(() =>  {
    console.log('The server up and running!')
    
})