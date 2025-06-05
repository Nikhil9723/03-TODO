import type { TodoList } from '../types/reducerTypes';
import { setTodo } from '../utils/localStorageHandler';

export type TodoAction =
  | { type: 'add_todos'; payload: TodoList }
  | {
      type: 'Edit_todos';
      payload: { id: string; title: string; timeStamp: string };
    }
  | { type: 'delete_todos'; payload: { id: string } }
  | { type: 'filter_todo'; payload: { title: string } }
  | { type: 'MARK_AS_DONE'; payload: { id: string; status: string } };

export type TodoContextType = {
  todos: TodoList[];
  dispatch: React.Dispatch<TodoAction>;
};

export default function reducerTodos(todos: TodoList[], action: TodoAction) {
  switch (action.type) {
    case 'add_todos':
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

    case 'Edit_todos':
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

    case 'delete_todos':
      todos = todos.filter((item) => {
        if (!(item.id === action.payload.id)) {
          return item;
        }
      });
      setTodo(todos);
      return todos;

    case 'MARK_AS_DONE':
      todos = todos.map((item) => {
        if (item.id === action.payload.id) {
          item.status = action.payload.status;
          return item;
        }
        return item;
      });
  }
  return todos;
}
