
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

import { Button, Flex  } from '@aws-amplify/ui-react';

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

    
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  return (
        
    <Authenticator>
         {({ signOut, user }) => (
    <main>
                <h1>Signed In as: {user?.signInDetails?.loginId}</h1>
      <h1>Media On Incubation</h1>
      <button onClick={createTodo}>Add Media</button>
      <ul>
     
        {todos.map((todo) => (
             <Flex alignItems={'stretch'} align-items={"align-items"} >
          <li 
        
          
          key={todo.id}>{todo.content}
           <Button   onClick={() => deleteTodo(todo.id)}variation="primary" colorTheme="error">Delete</Button>
          
          </li>
          </Flex>
        ))}
      </ul>
      <div>
         Try creating adding Media to the Incubation Tracker.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
      <button onClick={signOut}>Sign out</button>
    </main>
        
        )}
        </Authenticator>
  );
}

export default App;
