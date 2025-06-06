import { getTodo, setTodo } from "../utils/localStorageHandler";
import type { TodoList } from "../types/reducerTypes";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initState: TodoList[] = getTodo() || [];

export const todoSlice = createSlice({
  name: "todoList",
  initialState: initState,

  reducers: {
    addTodo: (todos: TodoList[], action: PayloadAction<TodoList>) => {
      console.log("hii");

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
    },

    deleteTodo: (
      todos: TodoList[],
      action: PayloadAction<Pick<TodoList, "id">>,
    ) => {
      todos = todos.filter((item) => {
        if (!(item.id === action.payload.id)) {
          return item;
        }
      });
      console.log(todos);
      setTodo(todos);
      return todos;
    },

    editTodo: (
      todos: TodoList[],
      action: PayloadAction<Omit<TodoList, "status">>,
    ) => {
      todos = todos.map((item) => {
        if (item.id === action.payload.id) {
          item.title = action.payload.title;
          item.timeStamp = action.payload.timeStamp;
          return item;
        } else {
          return item;
        }
      });
      console.log(todos);
      setTodo(todos);
    },

    markAsDone: (
      todos: TodoList[],
      action: PayloadAction<Pick<TodoList, "status" | "id">>,
    ) => {
      todos = todos.map((item) => {
        if (item.id === action.payload.id) {
          item.status = action.payload.status;
          return item;
        }
        return item;
      });
      setTodo(todos);
    },
  },
});
