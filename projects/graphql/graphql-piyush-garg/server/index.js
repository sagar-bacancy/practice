// @apollo/server: The core Apollo Server package.
// graphql: The GraphQL package.
// @graphql/subscriptions: Provides the PubSub class to handle the publish-subscribe pattern.
// ws: A WebSocket implementation needed for subscriptions.

// Starting from Apollo Server 4, the support for subscriptions is handled by a separate package like graphql-ws or subscriptions-transport-ws. As of Apollo Server 4, the built-in support for subscriptions using subscriptions-transport-ws has been removed, and graphql-ws is recommended for handling subscriptions.

const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require("axios");

async function startServer() {
  // In Rest APIs we create routes and then we can use them but in graphql we need to provide schema
  const app = express();

  // This will give you an error because we are not providing any schema so graphql server don't know about the schema
  // So we need to provide schema to the server

  // const server = new ApolloServer({})

  // typeDefs and resolvers are required to create a graphql server
  // typeDefs
  // The typeDefs in GraphQL are used to define the schema of your API.
  // The schema is a collection of types that define the data you can query on your API.
  // Query: Defines the entry point for fetching data. Here, you can create a query to fetch a single record by a field or all records.
  // Mutation: Defines the entry point for modifying data. In this case, you can create, put, patch or delete.
  // User: Defines a custom type that includes the fields id, name, and email etc...

  // resolvers
  // resolvers are functions that define how to fetch or modify the data for the fields in your schema.
  // They are responsible for implementing the logic of how data should be resolved when a query or mutation is made.
  // We are providing the data in the resolvers by an external API or from the database

  const server = new ApolloServer({
    typeDefs: `
            # This "User" type defines the queryable fields for every user in our data source.
            # pass description to the type using """
            """You can introspect this Description of a type User from the query's default __type or __schema fields, but only if introspection is on."""
            type User {
                """
                The ID of the user.
                """
                id: ID!
                """
                The name of the user.
                """
                name: String!
                username: String!
                email: String!
                phone: String!
                website: String
            }
            # This "Todo" type defines the queryable fields for every todo in our data source.
            # The "user" field is a reference to the User type.
            type Todo {
                id: ID!
                title: String!
                completed: Boolean
                user: User
            }
                
            type Query {
                getTodos: [Todo]
                getAllUsers: [User]
                getUser(id: ID!): User
            }

            input TodoInput {
              userId: ID!
              title: String!
              completed: Boolean!
            }

            type Mutation {
                createTodo(input:TodoInput): Todo # take input type as argument
                # or
                # createTodo(userId: ID!, title: String!, completed: Boolean!): Todo # if you don't want to use input type
            }
        `,
    resolvers: {
      // This resolver is used to resolve the user field in the Todo type.
      Todo: {
        user: async (todo) => {
          console.log({ todo });
          return (
            await axios.get(
              `https://jsonplaceholder.typicode.com/users/${todo?.userId}`
            )
          ).data;
        },
      },
      Query: {
        // API logic like Database operations or API calls can be performed in the resolvers.
        // getTodos: () => [{ id: 1, title: 'Learn GraphQL', completed: false }]
        getTodos: async () => {
          try {
            return (
              await axios.get("https://jsonplaceholder.typicode.com/todos")
            ).data;
          } catch (error) {
            console.log({error});
            throw new Error("something went wrong");
          }
        },
        getAllUsers: async () =>
          (await axios.get("https://jsonplaceholder.typicode.com/users")).data,

        // different arguments
        // 1. parent
        // In this case, the parent argument is the Todo object.
        // 2. query fields
        // The second argument is the arguments passed to the field in the query.
        // 3. context and contextValue
        // The context argument is an object that is shared across all resolvers.
        // During a GraphQL operation, you can share data throughout your server's resolvers and plugins by creating an object named contextValue.
        // You can pass useful things through your contextValue that any resolver might need, like authentication scope, sources for fetching data, database connections, and custom fetch functions.
        // If you're using dataloaders to batch requests across resolvers, you can also attach them to the shared contextValue.

        getUser: async (parent, { id }, contextValue, info) => {
          console.log({ parent, id, contextValue, info });
          return (
            await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
          ).data;
        },
      },
      Mutation: {
        // createTodo: async (parent, {userId, title, completed}) => {
        createTodo: async (parent, { input: { userId, title, completed } }) => {
          const newUser = { userId, title, completed };
          const { data } = await axios.post(
            "https://jsonplaceholder.typicode.com/todos",
            newUser
          );
          return data;
        },
      },
    },
    introspection: true, // you can not introspect the schema if it is false
    // introspection: process.env.NODE_ENV !== 'production', // Disable introspection in production
    formatError: (err) => {
    // Customize error formatting
    return {
      message: err.message,
      code: err.extensions.code,
      locations: err.locations,
    };
  }
  });

  app.use(cors());
  app.use(bodyParser.json()); // `req.body` will contain the parsed data

  await server.start(); // Starting the Apollo Server
  app.use(
    "/graphql",
    expressMiddleware(server, {
      // Your async context function should async and
      // return an object
      //   context: async ({ req, res }) => ({
      //     authScope: getScope(req.headers.authorization),
      //   }),
    })
  ); // Adding Apollo Server as middleware

  app.listen(8000, () => {
    console.log("Server running on port 8000");
  });
}

startServer();
