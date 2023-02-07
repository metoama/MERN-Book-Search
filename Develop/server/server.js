const express = require('express');
const { ApolloServer } = require('apollo-server-express'); 

//Importing two parts of GraphQL Schema 
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const path = require('path');

const routes = require('./routes'); //comment out once client folder built 
const { start } = require('repl');


const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers
});


const app = express(); //may not need this 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const startApolloServer = async (typeDefs,resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => { console.log(`🌍 Now listening on localhost:${PORT}`)
      console.log(`API server running on port ${PORT}!`)
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
};

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

//comment out once client folder is built
app.use(routes);

startApolloServer(typeDefs, resolvers);

