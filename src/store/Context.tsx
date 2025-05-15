import type { TodoList } from "../types/reducerTypes";
import { getTodo } from "../utils/localStorageHandler";
import reducerTodos, { type TodoContextType } from "./reducer";
import { createContext, useReducer, type ReactNode } from "react";

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoContext = createContext<TodoContextType>({
  todos: [],
  dispatch: () => {},
});

const initState: TodoList[] = getTodo() || [];

export function TodoProvider({ children }: TodoProviderProps) {
  const [todos, dispatch] = useReducer(reducerTodos, initState);
  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}
