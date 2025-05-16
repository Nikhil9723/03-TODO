import { useContext, useRef } from "react";
import { TodoContext } from "../store/Context";
import TodoItems from "../components/TodoItems";
import { useSearchParams } from "react-router";
import getTimestamp from "../utils/TimeStamp";
import type { TodoList } from "../types/reducerTypes";
import { KeyboardEvent, Reducer } from "../constants/constants";
import type { EventType } from "./type";

export default function Todo() {
  const context = useContext(TodoContext);
  const [searchParam, setSearchParam] = useSearchParams();
  const { todos, dispatch } = context;

  const todoTitle = useRef<HTMLInputElement | null>(null);
  const searchInput = useRef<HTMLInputElement>(null);

  const filterdTitle = searchParam.get("title")?.toLowerCase() ?? "";
  const filterTodos: TodoList[] = todos.filter((item) =>
    item.title.toLowerCase().includes(filterdTitle),
  );

  function AddTodoItems() {
    dispatch({
      type: Reducer.ADD_TODOS,
      payload: {
        id: crypto.randomUUID(),
        title: todoTitle.current!.value,
        status: "pending",
        timeStamp: getTimestamp(),
      },
    });
    const currentItem = todoTitle.current;
    if (currentItem) {
      currentItem.value = "";
    }
  }

  function handelAddTodo(e: EventType) {
    if ("key" in e) {
      if (e.key === KeyboardEvent.ENTER) {
        AddTodoItems();
      } else if ("clientX" in e) {
        AddTodoItems();
      }
    }
  }

  function handelFilterChange() {
    const value: string = searchInput.current!.value;
    if (value) {
      setSearchParam({ title: value });
    } else {
      setSearchParam("");
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-4">
        <input
          ref={searchInput}
          onChange={handelFilterChange}
          type="text"
          value={filterdTitle}
          placeholder="Search for your todo"
          className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <h1 className="text-3xl font-semibold text-center mb-4 text-gray-800">
        To Do List
      </h1>

      <div className="flex gap-4 mb-4 w-full">
        <input
          onKeyDown={handelAddTodo}
          ref={todoTitle}
          type="text"
          className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Enter new todo"
        />
        <button
          onClick={handelAddTodo}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          ADD
        </button>
      </div>

      <TodoItems filterTodos={filterTodos} />
    </div>
  );
}
