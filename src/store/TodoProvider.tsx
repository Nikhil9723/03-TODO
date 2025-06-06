import { useReducer, type ReactNode } from "react";
import type { TodoList } from "../types/reducerTypes";
import { getTodo } from "../utils/localStorageHandler";
import reducerTodos  from "./reducer";
import { TodoContext } from "./Context";

interface TodoProviderProps {
    children: ReactNode;
  }
  
  const initState: TodoList[] = getTodo() || [];
  
  export function TodoProvider({ children }: TodoProviderProps) {
    const [todos, dispatch] = useReducer(reducerTodos, initState);
    return (
      <TodoContext.Provider value={{ todos, dispatch }}>
        {children}
      </TodoContext.Provider>
    );
  }
  