import { useReducer, type ReactNode } from 'react';

import type { TodoList } from '../types/reducerTypes';
import { getTodo } from '../utils/localStorageHandler';

import { TodoContext } from './Context';
import reducerTodos from './reducer';

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
