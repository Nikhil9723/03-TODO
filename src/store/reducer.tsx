import { setTodo } from "../utils/localStorageHandler";
import type { TodoList } from "../types/reducerTypes";
import { Reducer } from "../constants/constants";

export type TodoAction =
  | { type: Reducer.ADD_TODOS; payload: TodoList }
  | {
      type: Reducer.EDIT_TODOS;
      payload: { id: string; title: string; timeStamp: string };
    }
  | { type: Reducer.DELETE_TODOS; payload: { id: string } }
  | { type: Reducer.FILTER_TODOS; payload: { title: string } }
  | { type: Reducer.MARK_AS_DONE; payload: { id: string; status: string } };

export type TodoContextType = {
  todos: TodoList[];
  dispatch: React.Dispatch<TodoAction>;
};

export default function reducerTodos(todos: TodoList[], action: TodoAction) {
  switch (action.type) {
    case Reducer.ADD_TODOS:
      todos = [
        ...todos,
        {
          id: action.payload.id,
          title: action.payload.title,
          status: action.payload.status,
          timeStamp: action.payload.timeStamp,
        },
      ];
      setTodo(todos);
      return todos;

    case Reducer.EDIT_TODOS:
      todos = todos.map((item) => {
        if (item.id === action.payload.id) {
          item.title = action.payload.title;
          item.timeStamp = action.payload.timeStamp;
          return item;
        } else {
          return item;
        }
      });
      setTodo(todos);
      return todos;

    case Reducer.DELETE_TODOS:
      todos = todos.filter((item) => {
        if (!(item.id === action.payload.id)) {
          return item;
        }
      });
      console.log(todos);
      setTodo(todos);
      return todos;

    case Reducer.MARK_AS_DONE:
      todos = todos.map((item) => {
        if (item.id === action.payload.id) {
          item.status = action.payload.status;
          return item;
        }
        return item;
      });
      setTodo(todos);
      return todos;
  }
  return todos;
}
