import type { TodoList } from "../types/reducerTypes";

export function setTodo(todos: TodoList[]) {
  localStorage.setItem("TodoKey", JSON.stringify(todos));
}

export function getTodo() {
  const todoData = localStorage.getItem("TodoKey");
  if (!todoData) return;
  return JSON.parse(todoData);
}
