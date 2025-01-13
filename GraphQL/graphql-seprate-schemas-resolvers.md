# Separating GraphQL Types and Resolvers Without Third-Party Modules

Yes, it is absolutely possible to separate GraphQL types and resolvers in your server without using third-party modules like `graphql-tools`. While `graphql-tools` and other libraries provide helpful utilities for handling schema creation and merging, you can manually define the GraphQL schema and resolvers. Below is a basic way to achieve this without any third-party modules.

## 1. Define GraphQL Types Separately

Instead of using `gql` or `makeExecutableSchema`, you can define your GraphQL schema directly using string-based schema definition language (SDL) or JavaScript object notation.

### Example: `types/userType.js`

```javascript
const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql');

// Define a GraphQL Type for User
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

module.exports = UserType;
```

### Example: `types/postType.js`

```javascript
const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql');

// Define a GraphQL Type for Post
const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  }),
});

module.exports = PostType;
```

## 2. Define GraphQL Queries and Mutations Separately

Each file for queries and mutations can export a set of resolver functions for those operations.

### Example: `resolvers/userResolvers.js`

```javascript
const User = require('../models/User'); // assuming you have a User model
const { GraphQLList, GraphQLID, GraphQLString } = require('graphql');
const UserType = require('../types/userType');

const userResolvers = {
  users: {
    type: new GraphQLList(UserType),
    resolve: async () => {
      return await User.find(); // fetching all users from the database
    }
  },
  user: {
    type: UserType,
    args: {
      id: { type: GraphQLID },
    },
    resolve: async (_, { id }) => {
      return await User.findById(id); // fetching a single user by ID
    }
  },
  createUser: {
    type: UserType,
    args: {
      username: { type: GraphQLString },
      email: { type: GraphQLString },
    },
    resolve: async (_, { username, email }) => {
      const newUser = new User({ username, email });
      return await newUser.save(); // create and return the new user
    }
  },
};

module.exports = userResolvers;
```

### Example: `resolvers/postResolvers.js`

```javascript
const Post = require('../models/Post'); // assuming you have a Post model
const { GraphQLList, GraphQLID, GraphQLString } = require('graphql');
const PostType = require('../types/postType');

const postResolvers = {
  posts: {
    type: new GraphQLList(PostType),
    resolve: async () => {
      return await Post.find(); // fetching all posts
    }
  },
  post: {
    type: PostType,
    args: {
      id: { type: GraphQLID },
    },
    resolve: async (_, { id }) => {
      return await Post.findById(id); // fetching a post by ID
    }
  },
};

module.exports = postResolvers;
```

## 3. Combine Types and Resolvers

Once you’ve defined the types and resolvers separately, you can combine them into a single GraphQL schema manually. Since you’re not using `graphql-tools` or any other module, you would need to manually assemble the `GraphQLSchema` and link the types to the queries and mutations.

### Example: `schema.js`

```javascript
const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const UserType = require('./types/userType');
const PostType = require('./types/postType');
const userResolvers = require('./resolvers/userResolvers');
const postResolvers = require('./resolvers/postResolvers');

// Define the RootQuery and Mutation
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...userResolvers, // Spread user query resolvers
    ...postResolvers, // Spread post query resolvers
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...userResolvers, // Spread user mutation resolvers
    ...postResolvers, // Spread post mutation resolvers
  },
});

// Create the schema by combining queries and mutations
const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = schema;
```

## 4. Set Up the Apollo Server (or GraphQL Server)

Finally, you can create and run the GraphQL server using Apollo Server or any other GraphQL server framework.

### Example: `index.js`

```javascript
const { ApolloServer } = require('apollo-server');
const schema = require('./graphql/schema'); // the schema defined earlier

const server = new ApolloServer({
  schema, // pass the schema directly to ApolloServer
  context: ({ req }) => {
    // Optional: add context like authentication, etc.
  }
});

server.listen(4000).then(({ url }) => {
  console.log(`Server is running at ${url}`);
});
```

## Summary

By separating types and resolvers into different files manually, you gain full control over the schema and resolver logic without relying on third-party modules like `graphql-tools`. Here’s the breakdown:

1. **Types**: Defined using `GraphQLObjectType` for each entity.
2. **Resolvers**: Defined with specific fields for queries and mutations.
3. **Schema**: Combined manually by creating a `GraphQLSchema` and linking resolvers to query and mutation root fields.

This approach works fine for smaller projects, and it helps you gain deeper insight into the GraphQL structure. However, as your application grows, it may become more cumbersome to manage, so keep that in mind for future scalability.
