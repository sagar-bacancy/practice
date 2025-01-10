import { gql, useQuery, useMutation } from "@apollo/client";

function App() {
  // Crete graphql query
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
  `;

  // Polling
  // Polling provides near-real-time synchronization with your server by executing your query periodically at a specified interval.
  // To enable polling for a query, pass a pollInterval configuration option to the useQuery hook with an interval in milliseconds:

  // Refetching
  // Refetching enables you to refresh query results in response to a particular user action, as opposed to using a fixed interval.

  // Execute the query
  const { loading, error, data, refetch } = useQuery(query, {
    pollInterval: 1000 * 60 * 60 * 24, // call API every 1 day
  });
  console.log({
    loading,
    error,
    data,
  });

  const createTodoQuery = gql`
    mutation CreateTodo($userId: ID!, $title: String!, $completed: Boolean!) {
      createTodo(userId: $userId, title: $title, completed: $completed) {
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
  `;

  const [createTodo, { data: data1, loading: loading1, error: error1 }] =
    useMutation(createTodoQuery, {
      onCompleted: () => {
        refetch();
      },
    });

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <button onClick={() => refetch()}>Refetch</button>
      <button
        onClick={() =>
          createTodo({
            variables: {
              userId: "1",
              title: "Random Title",
              completed: false,
            },
          })
        }
      >
        Create Todo
      </button>
      {data && data?.getTodos
        ? data?.getTodos?.map((todo) => (
            <div key={todo?.id}>
              {todo?.user?.name} - {todo?.title}
            </div>
          ))
        : null}
    </>
  );
}

export default App;
