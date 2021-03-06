//const resolvers = require('./resolvers2.js'); //default  example
//const db = require('./db.js'); //manual db

//pull in our dependencies
const { ApolloServer } = require('apollo-server'); //named import example
const neo4j = require('neo4j-driver'); //connect to local or cloud neo4j DB
const { makeAugmentedSchema } = require('neo4j-graphql-js'); //schema augmentation and transpilation functionality
const { typeDefs } = require('./typeDefs2.js'); //graphql type definitions


//simulating a custom resolver used in the Business type
const resolvers = {
    Business: {
        waitTime: (obj, args, context, info) => {
        const options = [0, 5, 10, 15, 30, 45];
        return options[Math.floor(Math.random() * options.length)];
        }
    }
};

//auto generate resolvers for our type definitions (takes in a typeDef or schema object)
const schema = makeAugmentedSchema({
    typeDefs,
    resolvers,
    config: {
        mutation: true,
        auth: {
            isAuthenticated: true,
            hasRole: true
        }
    }
});

//create neo4j driver instance to connect to db
const driver = neo4j.driver(
    "bolt://localhost:7687",
    neo4j.auth.basic("neo4j","secure$123")
);

//HTTP req injected to validate JWT token in auth header - need to add global variable on UNIX level: export JWT_SECRET=Dpwm9XXKqk809WXjCsOmRSZQ5i5fXw8N
const server = new ApolloServer({
    schema,
    context: ({req}) => {
        return { req, driver }; //return an object with two objects inside it
    }
});


server.listen().then(({url}) =>{
    console.log(`Graphql server ready at ${url}`)
});