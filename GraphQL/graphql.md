<samp>

# [GraphQL](https://graphql.org/learn/)

- [GraphQL](#graphql)
  - [Introduction](#introduction)
  - [Why GraphQL Was Introduced](#why-graphql-was-introduced)
    - [1. Over-fetching and Under-fetching of Data](#1-over-fetching-and-under-fetching-of-data)
    - [2. Multiple Requests to Different Endpoints](#2-multiple-requests-to-different-endpoints)
    - [3. API Versioning](#3-api-versioning)
    - [4. Strongly Typed System and Schema](#4-strongly-typed-system-and-schema)
    - [5. Frontend-Driven Development](#5-frontend-driven-development)
    - [6. Real-Time Data and Subscriptions](#6-real-time-data-and-subscriptions)
    - [7. Complex Relationships Between Data](#7-complex-relationships-between-data)
    - [8. Developer Productivity and Tooling](#8-developer-productivity-and-tooling)
    - [Conclusion](#conclusion)
  - [Apollo Server with GraphQL for backend](#apollo-server-with-graphql-for-backend)
    - [Installation](#installation)
    - [Define your GraphQL schema (Shape of you data) and variable types and The \_\_typename field](#define-your-graphql-schema-shape-of-you-data-and-variable-types-and-the-__typename-field)
    - [Define your GraphQL resolver (Actual business logic like db operations or API calls)](#define-your-graphql-resolver-actual-business-logic-like-db-operations-or-api-calls)
    - [Create an instance of ApolloServer(Pass graphql config like schema and resolvers to it) and pass it as a middleware to a backend server](#create-an-instance-of-apolloserverpass-graphql-config-like-schema-and-resolvers-to-it-and-pass-it-as-a-middleware-to-a-backend-server)
    - [Interface and Union](#interface-and-union)
      - [Union](#union)
      - [Interface type](#interface-type)
  - [Apollo Client with GraphQL for frontend](#apollo-client-with-graphql-for-frontend)
    - [Installation](#installation-1)
    - [Initialize ApolloClient and Connect your client to React](#initialize-apolloclient-and-connect-your-client-to-react)
    - [Fetch data with useQuery in your components](#fetch-data-with-usequery-in-your-components)
    - [Polling](#polling)
    - [Refetching](#refetching)
    - [Suspense - Fetching with Suspense](#suspense---fetching-with-suspense)

## Introduction

- GraphQL is a query language for your API, and a server-side runtime for executing queries using a type system you define for your data.

## Why GraphQL Was Introduced

GraphQL was introduced to address several challenges and limitations associated with traditional REST APIs. Here’s why it was created:

### 1. Over-fetching and Under-fetching of Data
- **Problem**: In REST APIs, clients often fetch more data than needed (over-fetching) or not enough data (under-fetching). This occurs because REST endpoints return fixed sets of data, regardless of the client’s needs.
- **Solution**: GraphQL allows clients to request exactly the data they need, which eliminates over-fetching and under-fetching. With GraphQL, clients can specify the shape and structure of the response data, reducing unnecessary data transfers.

   **Example**: 
   - In REST, a request for a user might return the user along with all their posts, comments, etc., even if the client only needed the user's name and email.
   - In GraphQL, the client can request just the `name` and `email` fields, avoiding the unnecessary data.

### 2. Multiple Requests to Different Endpoints
- **Problem**: REST APIs often require multiple requests to different endpoints to fetch related data. For example, to get a user's profile, their posts, and their comments, you would need separate API calls like `/users`, `/posts`, and `/comments`, leading to higher network overhead and slower performance.
- **Solution**: GraphQL allows fetching all the necessary data in a single request. A single query can retrieve data from multiple sources and even handle nested resources.

    **Example**: This query fetches the user’s information and their posts in a single request.
    ```graphql
    query {
        user(id: "1") {
        name
        posts {
            title
            content
        }
        }
    }
    ```

### 3. API Versioning
- **Problem**: In REST, as APIs evolve, new versions need to be created (e.g., `/v1/users`, `/v2/users`). This leads to maintaining multiple versions of the same API, increasing complexity, and often breaking client apps when an API version is updated.
- **Solution**: GraphQL does not require versioning. Since the client specifies the data it needs, the server can evolve the API by adding new fields and types without breaking existing clients. If a field is deprecated, the server can simply stop returning it without impacting the clients that don’t need it.

### 4. Strongly Typed System and Schema
- **Problem**: REST APIs are often loosely defined, and clients must infer the structure of responses from documentation or trial-and-error.
- **Solution**: GraphQL introduces a strongly typed system, where the schema is defined explicitly. This schema serves as a contract between the client and the server. Clients can introspect the schema to understand the data available and the types of each field, making it easier to interact with the API.

### 5. Frontend-Driven Development
- **Problem**: In REST, the frontend often has to wait for backend developers to expose new endpoints to meet changing requirements or new features. This can slow down the development cycle.
- **Solution**: With GraphQL, frontend developers can work more independently by querying for exactly the data they need. This enables faster iteration and more responsive development cycles, as the frontend can adapt to the changing API by simply modifying the queries.

### 6. Real-Time Data and Subscriptions
- **Problem**: Traditional REST APIs don’t have built-in support for real-time updates or event-driven architecture. For real-time data, separate systems like WebSockets or long polling are often required.
- **Solution**: GraphQL supports **subscriptions**, which allow clients to receive real-time updates via WebSockets. Subscriptions are integrated directly into the GraphQL system, making it easier to implement features like notifications or live data feeds.

### 7. Complex Relationships Between Data
- **Problem**: In REST, dealing with complex relationships between data often requires multiple round-trips to the server (e.g., fetching a user, then fetching their posts, and then fetching the comments for each post).
- **Solution**: GraphQL makes it easy to query complex, nested relationships in a single request, allowing clients to get all the related data in one go, avoiding multiple requests to different endpoints.

### 8. Developer Productivity and Tooling
- **Problem**: Building and maintaining REST APIs can be time-consuming, particularly when APIs grow in complexity.
- **Solution**: GraphQL simplifies development by offering rich tooling, such as:
  - **GraphiQL**: An in-browser IDE for testing queries.
  - **Apollo Client**: A powerful GraphQL client for managing data and caching.
  - **Apollo Server**: A popular server-side library for building GraphQL APIs.
  - **Introspection**: Clients can introspect the schema, making it easier for developers to explore the API and generate documentation automatically.

### Conclusion

- GraphQL was introduced to overcome the inherent limitations of REST APIs, particularly issues around data fetching, versioning, and flexibility. By providing a more efficient, flexible, and declarative way to query data, it enables developers to create better, more maintainable, and more performant APIs, all while giving clients the control they need over the data they request. It has become a popular choice for modern applications, particularly those with complex, dynamic data requirements.

## [Apollo Server with GraphQL for backend](https://www.apollographql.com/docs/apollo-server/getting-started)

### Installation

- `npm install @apollo/server graphql`

- graphql (also known as graphql-js) is the library that implements the core GraphQL parsing and execution algorithms.
- @apollo/server is the main library for Apollo Server itself. Apollo Server knows how to turn HTTP requests and responses into GraphQL operations and run them in an extensible context with support for plugins and other features.

### [Define your GraphQL schema (Shape of you data) and variable types and The __typename field](https://www.apollographql.com/docs/apollo-server/schema/schema)

```js
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;
```

### Define your GraphQL resolver (Actual business logic like db operations or API calls)

```js
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
  },
};
```

### Create an instance of ApolloServer(Pass graphql config like schema and resolvers to it) and pass it as a middleware to a backend server

```js
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
```

### [Interface and Union](https://www.apollographql.com/docs/apollo-server/schema/unions-interfaces)

#### Union

- The following schema defines a SearchResult union type that can return either a Book or an Author:

```graphql
union SearchResult = Book | Author

type Book {
  title: String!
}

type Author {
  name: String!
}

type Query {
  search(contains: String): [SearchResult!]
}
```

#### Interface type

- An interface specifies a set of fields that multiple object types can include:

```graphql
interface Book {
  title: String!
  author: Author!
}

type Textbook implements Book {
  title: String!
  author: Author!
  courses: [Course!]!
}

type ColoringBook implements Book {
  title: String!
  author: Author!
  colors: [String!]!
}

type Query {
  books: [Book!]!
}
```

- In this schema, Query.books returns a list that can include both Textbooks and ColoringBooks.

## [Apollo Client with GraphQL for frontend](https://www.apollographql.com/docs/react/get-started)

### Installation

- `npm install @apollo/client graphql`

- graphql: This package provides logic for parsing GraphQL queries.
- @apollo/client: This single package contains virtually everything you need to set up Apollo Client. It includes the in-memory cache, local state management, error handling, and a React-based view layer.

### Initialize ApolloClient and Connect your client to React

- Wrap App component with a Apollo provider.
- Create Apollo client and pass it to a Apollo provider.

```js
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://flyby-router-demo.herokuapp.com/', // uri specifies the URL of our GraphQL server.
  cache: new InMemoryCache(), // cache is an instance of InMemoryCache, which Apollo Client uses to cache query results after fetching them.
});

// Supported in React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);
```

### Fetch data with useQuery in your components

- After your ApolloProvider is hooked up, you can start requesting data with useQuery.
- The useQuery hook is a React hook that shares GraphQL data with your UI.
- We can define the query we want to execute by wrapping it in the gql template literal:

```js
import { gql, useQuery } from '@apollo/client'

function App() {
  const query = gql`
  query GetTodosQuery {
    getTodos {
      id
      title
      completed
      user {
        id
        name
        username
      }
    }
  }
  `
  const { loading, error, data } = useQuery(query)
}
```

### Polling

- Polling provides near-real-time synchronization with your server by executing your query periodically at a specified interval.
- To enable polling for a query, pass a pollInterval configuration option to the useQuery hook with an interval in milliseconds:
  
### Refetching

- Refetching enables you to refresh query results in response to a particular user action, as opposed to using a fixed interval.

### Suspense - Fetching with Suspense

- Let say, App component renders a Suspended Dog component which fetches the record for a single dog via useSuspenseQuery.
- useSuspenseQuery does not return a loading boolean. That's because the component calling useSuspenseQuery always suspends when fetching data.

</samp> 