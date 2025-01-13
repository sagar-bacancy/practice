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
  - [GraphQL types](#graphql-types)
    - [1. **Scalar Types**](#1-scalar-types)
    - [2. **Object Types**](#2-object-types)
    - [3. **Query and Mutation Types**](#3-query-and-mutation-types)
    - [4. **Input Types**](#4-input-types)
    - [5. **Enum Types**](#5-enum-types)
    - [6. **List Types**](#6-list-types)
    - [7. **Non-Null Types**](#7-non-null-types)
    - [8. **Union Types**](#8-union-types)
    - [9. **Interface Types**](#9-interface-types)
    - [10. **Subscription Types**](#10-subscription-types)
    - [11. **Custom Scalar Types**](#11-custom-scalar-types)
    - [Summary of GraphQL Types:](#summary-of-graphql-types)
  - [Graphql Directives](#graphql-directives)
    - [Built-in Directives in GraphQL](#built-in-directives-in-graphql)
  - [Apollo Server with GraphQL for backend](#apollo-server-with-graphql-for-backend)
    - [Installation](#installation)
    - [Define your GraphQL schema (Shape of you data) and variable types and The \_\_typename field](#define-your-graphql-schema-shape-of-you-data-and-variable-types-and-the-__typename-field)
    - [Define your GraphQL resolver (Actual business logic like db operations or API calls)](#define-your-graphql-resolver-actual-business-logic-like-db-operations-or-api-calls)
    - [Create an instance of ApolloServer(Pass graphql config like schema and resolvers to it) and pass it as a middleware to a backend server](#create-an-instance-of-apolloserverpass-graphql-config-like-schema-and-resolvers-to-it-and-pass-it-as-a-middleware-to-a-backend-server)
    - [Type (ObjectType) vs Input](#type-objecttype-vs-input)
      - [Use Cases for Input Types Instead of Types](#use-cases-for-input-types-instead-of-types)
    - [Interface and Union](#interface-and-union)
      - [Union](#union)
      - [Interface type](#interface-type)
    - [Interface vs Union](#interface-vs-union)
  - [Apollo Client with GraphQL for frontend](#apollo-client-with-graphql-for-frontend)
    - [Installation](#installation-1)
    - [Initialize ApolloClient and Connect your client to React](#initialize-apolloclient-and-connect-your-client-to-react)
    - [Fetch data with useQuery in your components](#fetch-data-with-usequery-in-your-components)
    - [Polling](#polling)
    - [Refetching](#refetching)
    - [Suspense - Fetching with Suspense](#suspense---fetching-with-suspense)
    - [Next.js - @apollo/server vs apollo-server-micro](#nextjs---apolloserver-vs-apollo-server-micro)

## Introduction

- GraphQL is a query language for your API, and a server-side runtime for executing queries using a type system you define for your data.
- Basics:
  - `Queries`: Request data from the server.
  - `Mutations`: Modify data on the server (similar to POST, PUT, DELETE).
  - `Schemas`: Define the structure of data in GraphQL.
  - `Resolvers`: Functions that resolve queries and mutations.
- Complex Queries
  - `Nested queries`: Query related data in a single request.
    - Example:
      - Schema
        ```graphql
          type User {
            id: ID!
            name: String!
            posts: [Post]
          }

          type Post {
            id: ID!
            title: String!
            content: String!
            author: User!
          }

          type Query {
            users: [User]
            user(id: ID!): User
            posts: [Post]
            post(id: ID!): Post
          }
        ```
      - Query
        ```graphql
          query {
            users {
              id
              name
              posts {
                id
                title
                content
              }
            }
          }
        ```
  - `Mutations`: Use mutation for adding, updating, and deleting data.
    - Example: Here we can also use input type for mutation arguments.
      - Schema
        ```graphql
          type Post {
            id: ID!
            title: String!
            content: String!
            author: User!
          }

          type User {
            id: ID!
            name: String!
          }

          type Mutation {
            createPost(title: String!, content: String!, authorId: ID!): Post
          }
        ```
      - Query
        ```graphql
          mutation {
          createPost(title: "GraphQL Mutations", content: "How to use mutations in GraphQL", authorId: "1") {
            id
            title
            content
            author {
              id
              name
            }
          }
        }
        ```
  - `Subscriptions`: Real-time updates via GraphQL subscriptions.
- Use GraphQL Playground or Apollo Studio

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

## GraphQL types

In GraphQL, there are several core types that define how data is structured and interacted with. These types are categorized into **scalar types**, **object types**, **enum types**, **input types**, and more. Below is a comprehensive list of GraphQL types and their descriptions:

### 1. **Scalar Types**
Scalar types represent the most basic unit of data. They are the leaves in the GraphQL type tree and cannot be further subdivided.

- **`Int`**: A 32-bit integer.
- **`Float`**: A floating point number, for decimals.
- **`String`**: A sequence of characters (text).
- **`Boolean`**: A true or false value.
- **`ID`**: A unique identifier, often used for object IDs. Can be serialized as a string or integer.

These types are predefined and used to represent basic values in your schema.

### 2. **Object Types**
An **Object Type** defines a set of fields and how to retrieve them. Each field is associated with a type, and an object type represents an entity with related data.

- **Example**:
  ```graphql
  type User {
    id: ID!
    name: String!
    age: Int
  }
  ```
Object types are used to define the structure of your GraphQL queries and responses.

### 3. **Query and Mutation Types**
- **`Query`**: The entry point for reading data from a GraphQL server. Every GraphQL service has exactly one root `Query` type.
- **`Mutation`**: The entry point for modifying data (create, update, delete operations) in a GraphQL server. Not every GraphQL service needs a `Mutation` type, but it’s commonly used.

- **Example**:
  ```graphql
  type Query {
    user(id: ID!): User
  }
  type Mutation {
    createUser(name: String!, age: Int!): User
  }
  ```

### 4. **Input Types**
**Input Types** are used to specify the structure of the input data for mutations or arguments in queries. Unlike object types, input types can’t have fields that return other object types or require resolver functions.

- **Example**:
  ```graphql
  input UserInput {
    name: String!
    age: Int
  }
  ```

  **Input types** are commonly used when passing complex data into mutations.

### 5. **Enum Types**
**Enum Types** represent a fixed set of allowed values, often used for categorizing data or limiting input to a predefined set of options.

- **Example**:
  ```graphql
    enum Status {
    ACTIVE
    INACTIVE
    PENDING
  }
  ```

- Enums ensure that only specific values are allowed for a particular field.

### 6. **List Types**
A **List Type** is used to define an array of another type. It is denoted by square brackets (`[Type]`).

- **Example**:
  ```graphql
  type Query {
    users: [User]  # List of User objects
  }
  ```

- Lists are used when a field returns multiple values.

### 7. **Non-Null Types**
A **Non-Null Type** ensures that a field will never return `null`. It’s denoted with an exclamation mark (`!`) next to the type.

- **Example**:
  ```graphql
  type User {
    name: String!  # This field cannot be null
  }
  ```

- Non-null types are useful when you want to enforce that a field must always contain data.

### 8. **Union Types**
A **Union Type** is used to represent a field that can return multiple object types, but only one at a time. The union defines a list of possible types that the field might return.

- **Example**:
  ```graphql
  union SearchResult = User | Post | Comment
  ```
  
- The `SearchResult` field might return either a `User`, a `Post`, or a `Comment`.

### 9. **Interface Types**
An **Interface Type** is similar to a union, but it allows fields to be shared across different types. A field defined in an interface can be implemented by multiple object types, allowing for polymorphic behavior.

- **Example**:
  ```graphql
  interface Entity {
    id: ID!
  }
  type User implements Entity {
    id: ID!
    name: String!
  }
  type Post implements Entity {
    id: ID!
    title: String!
  }
  ```

- Here, both `User` and `Post` types implement the `Entity` interface, which means they both share the `id` field.

### 10. **Subscription Types**
A **Subscription Type** is used to subscribe to real-time updates from a GraphQL server. Subscriptions are typically used for events like new data being added, updated, or deleted.

- **Example**:
  ```graphql
  type Subscription {
    newMessage: Message
  }
  ```

- Subscriptions enable clients to receive data in real-time.

### 11. **Custom Scalar Types**
In addition to the built-in scalar types (`Int`, `String`, `Boolean`, etc.), GraphQL allows you to define **custom scalar types**. These are useful when you need to handle special data formats, such as dates, URLs, or custom encoding.

- **Example**:
  ```graphql
  scalar Date
  ```

- Custom scalars must be serialized, parsed, and validated by the server.

### Summary of GraphQL Types:

- **Scalar Types**: `Int`, `Float`, `String`, `Boolean`, `ID`
- **Object Types**: Represent entities with fields (e.g., `User`, `Post`)
- **Query and Mutation Types**: Entry points for reading and modifying data.
- **Input Types**: Used for passing complex data into queries/mutations.
- **Enum Types**: Fixed set of possible values.
- **List Types**: Array of values (e.g., `[User]`).
- **Non-Null Types**: Ensures a value is never `null`.
- **Union Types**: Fields that can return different object types.
- **Interface Types**: Define common fields that multiple object types can share.
- **Subscription Types**: For real-time updates.
- **Custom Scalar Types**: User-defined types for special data formats.

## Graphql Directives

- In GraphQL, directives are a powerful mechanism that allows you to modify how queries and mutations are executed. While GraphQL defines a few built-in directives, you can also create custom ones tailored to your needs.

### Built-in Directives in GraphQL

- GraphQL defines two built-in directives: @include and @skip, which can be applied to fields and fragments in queries. Additionally, GraphQL provides a @deprecated directive in the schema to indicate that a field or enum value should not be used.

1. @include Directive

- The @include directive allows you to conditionally include a field or fragment in the query response based on a boolean condition. If the condition is true, the field will be included in the response; if it’s false, it will be skipped.
- `Syntax`: @include(if: Boolean)
- `Usage`: Applied to fields or fragments to conditionally include them.

```graphql
query getUser($includeEmail: Boolean!) {
  user(id: "1") {
    id
    name
    email @include(if: $includeEmail)
  }
}
```

- In this query, the email field is included in the response if the includeEmail variable is true.

2. @skip Directive

- The @skip directive is the opposite of @include. It allows you to conditionally skip a field or fragment based on a boolean condition. If the condition is true, the field will be skipped; if it's false, the field will be included.
- `Syntax`: @skip(if: Boolean)
- `Usage`: Applied to fields or fragments to conditionally skip them.

```graphql
query getUser($skipEmail: Boolean!) {
  user(id: "1") {
    id
    name
    email @skip(if: $skipEmail)
  }
}
```

- Here, the email field is skipped if the skipEmail variable is true.

3. @deprecated Directive

- The @deprecated directive is used in the schema to indicate that a field or enum value is deprecated, meaning it should no longer be used by clients. This is commonly used when fields are being replaced or removed.
- `Syntax`: @deprecated(reason: String)
- `Usage`: Applied to fields or enum values to mark them as deprecated.

```graphql
type User {
  id: ID!
  name: String!
  email: String @deprecated(reason: "Use `contact` field instead")
}
```

- In this schema, the email field is deprecated, and clients are encouraged to use the contact field instead.

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

### [Define your GraphQL resolver (Actual business logic like db operations or API calls)](https://www.apollographql.com/docs/apollo-server/data/resolvers)

```js
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => [{id:1, name: "book name"}],
  },
};
```

### [Create an instance of ApolloServer(Pass graphql config like schema and resolvers to it) and pass it as a middleware to a backend server](https://www.apollographql.com/docs/apollo-server/integrations/integration-index)

- Apollo Server 4 includes two built-in integrations: [startStandaloneServer](https://www.apollographql.com/docs/apollo-server/api/standalone) and [expressMiddleware]((https://www.apollographql.com/docs/apollo-server/api/express-middleware)).

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
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
// Note you must call `start()` on the `ApolloServer`
// instance before passing the instance to `expressMiddleware`
await server.start();

// Specify the path where we'd like to mount our server
app.use(
  '/graphql',
  cors(),
  express.json(),
  expressMiddleware(server),
);
```

### Type (ObjectType) vs Input

- `Types (ObjectType)` are used to define the structure of the data returned by a query or mutation (e.g., User, Product, etc.). This is a basic components of a GraphQL schema . 
- `Input Types` are used to define the structure of the data passed into a mutation or query (e.g., UserInput, ProductInput, etc.).

`Schema:`
```graphql
type Product {
  id: ID!
  name: String!
  price: Float!
  description: String
}

# This is the input type used for passing product data as an argument in mutations
input ProductInput {
  name: String!
  price: Float!
  description: String
}

type Mutation {
  createProduct(input: ProductInput!): Product
}
```

`Mutation Query:`
```
mutation {
  createProduct(input: {
    name: "Laptop"
    price: 999.99
    description: "A powerful gaming laptop"
  }) {
    id
    name
    price
    description
  }
}

```

#### Use Cases for Input Types Instead of Types

- `Create or Update Operations`: When you want to send structured data to the server for creating or updating records, you should use input types.
- `Filtering and Pagination`: When you need complex query arguments (e.g., filters with multiple fields), you can use input types for structured queries.

`Schema:`
```graphql
input ProductFilter {
  minPrice: Float
  maxPrice: Float
  category: String
}

type Query {
  products(filter: ProductFilter): [Product]
}
```

`Query:`
```graphql
query {
  products(filter: {minPrice: 100, maxPrice: 500, category: "Electronics"}) {
    id
    name
    price
    category
  }
}
```

### [Interface and Union](https://www.apollographql.com/docs/apollo-server/schema/unions-interfaces)

#### Union

- A union is a type that allows a field to return one of several types, but the types do not need to share any fields. Unlike interfaces, union types do not enforce a common set of fields, making them more flexible, but with less structure.
- EX: In a social media app, a Comment could belong to different types of posts, such as PhotoPost or VideoPost. These post types might have different fields (e.g., a VideoPost might have a duration, but a PhotoPost might not).

```graphql
union Post = PhotoPost | VideoPost

type PhotoPost {
  id: ID!
  content: String!
  imageUrl: String!
}

type VideoPost {
  id: ID!
  content: String!
  videoUrl: String!
  duration: Int!
}

type Comment {
  id: ID!
  text: String!
  post: Post
}

type Query {
  comments: [Comment]
}
```

#### Interface type

- An interface specifies a set of fields that multiple object types can include:
- An interface is a type that defines a set of fields that other types must implement. It allows querying a field that can return different types, but those types must share the same set of fields.
- EX: Consider an e-commerce platform where different types of products share some common properties, like id, name, and price. We might define an interface like Product, and different product types (e.g., Book, Clothing) would implement this interface.

```graphql
interface Product {
  id: ID!
  name: String!
  price: Float!
}

type Book implements Product {
  id: ID!
  name: String!
  price: Float!
  author: String!
}

type Clothing implements Product {
  id: ID!
  name: String!
  price: Float!
  size: String!
}

type Query {
  products: [Product]
}
```

### Interface vs Union

| Feature |	Interface |	Union |
| ------- | --------- | ----- |
| Purpose |	Used when types share common fields |	Used when types do not share common fields |
| Field Reusability |	All implementing types share the same set of fields |	Types do not need to share any fields |
| Query	| Can query shared fields directly |	Must use fragments to handle different types |
| Use Case |	Useful for types that have common attributes (e.g., Product, User) |	Useful for types with no shared attributes (e.g., Post being PhotoPost or VideoPost) |

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
      __schema {
        # get all types and fields
        types {
          name
          description
          fields {
            name
            description
          }
        }
      }
      __type(name: $name) {
        # get specific type and fields
        name
        description
        fields {
          name
          description
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

### Next.js - @apollo/server vs apollo-server-micro

- `@apollo/server` is the new package for Apollo Server as of Apollo v4 (released in 2022). It's more modular and flexible but requires different handling compared to the older apollo-server-micro, which was designed specifically for serverless environments (like Vercel).
- `apollo-server-micro` was optimized for serverless functions (like those on Vercel) and Next.js API routes. However, @apollo/server is not as tightly coupled with serverless functions and will require a custom server setup.

</samp> 