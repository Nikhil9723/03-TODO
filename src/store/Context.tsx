
import { createContext  } from "react";
import type { TodoContextType } from "./reducer";


export const TodoContext = createContext<TodoContextType>({
  todos: [],
  dispatch: () => {},
});
