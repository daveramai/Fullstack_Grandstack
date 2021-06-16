const { typeDefs } = require('./typeDefs.js'); //named import example
const resolvers = require('./resolvers.js'); //default  example
const db = require('./db.js');
const { ApolloServer } = require('apollo-server');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {db}
})

server.listen().then(({url}) =>{
    console.log(`Server ready at ${url}`)
});