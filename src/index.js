import{ GraphQLServer, PubSub} from 'graphql-yoga'
import db from './db'
import Query from    './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'
import User from     './resolvers/User'
import Post from     './resolvers/Post'
import Comment from  './resolvers/Comment'


const pubsub = new PubSub()

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: { //importing above and here telling Graphql Server that below are the resolver objects - Sandeep
        Query,
        Mutation,
        Subscription,
        User,
        Post,
        Comment
    },
    context:    { // Context will have objects external to app which are shared with the app, like DB, Authentication, etc
        db: db,
        pubsub: pubsub
    }
})

server.start(() =>  {
    console.log('Hey Sandeep, Server is up and running ')
    
})