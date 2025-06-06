import { configureStore } from "@reduxjs/toolkit";
import { todoSlice } from "./todoSlice";

const store = configureStore({
    reducer:  {
        Todo: todoSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
});

export const { addTodo, deleteTodo, editTodo, markAsDone }  = todoSlice.actions;

export default store;

export type StateType = ReturnType<typeof store.getState>;
 