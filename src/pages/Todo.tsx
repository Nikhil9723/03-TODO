import { useContext, useRef } from "react";
import { TodoContext } from "../store/Context";
import TodoItems from "../components/TodoItems";
import { useSearchParams } from "react-router";
import getTimestamp from "../utils/TimeStamp";
import type { TodoList } from "../types/reducerTypes";

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

  function handelAddTodo() {
    // console.log(todoTitle.current?.value);
    dispatch({
      type: "add_todos",
      payload: {
        id: crypto.randomUUID(),
        title: todoTitle.current!.value,
        status: "pending",
        timeStamp: getTimestamp(),
      },
    });
  }

  function handelFilterChange() {
    const value: string = searchInput.current!.value;
    setSearchParam({ title: value });
  }
  return (
    <div className="m-5">
      <div>
        <input
          ref={searchInput}
          onChange={handelFilterChange}
          type="text"
          value={filterdTitle}
          placeholder="Search for your todo"
        />
      </div>
      <h1 className="">To Do List</h1>
      <div className="flex gap-2 w-full">
        <input
          ref={todoTitle}
          type="text"
          className="border-2 border-black flex-1"
        />
        <button onClick={handelAddTodo} className="border-2 border-black">
          ADD
        </button>
      </div>
      <TodoItems filterTodos={filterTodos} />
    </div>
  );
}
