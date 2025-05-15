import type { TodoList } from "../types/reducerTypes";
import { TodoContext } from "../store/Context";
import { useContext } from "react";
import { Link } from "react-router-dom";

type ChildType = {
  filterTodos: TodoList[];
};

export default function TodoItems({ filterTodos }: ChildType) {
  const { dispatch } = useContext(TodoContext);

  function handelDelete(targetId: string) {
    dispatch({ type: "delete_todos", payload: { id: targetId } });
  }

  return (
    <ul>
      {filterTodos.map((item: TodoList, index) => (
        <li className="w-full border-2 border-black my-2 p-2" key={item.id}>
          {" "}
          <div className="flex flex-col  my-2">
            <p>{index + 1}</p>
            <p> Title: {item.title}</p>
            <p> Status: {item.status}</p>
            <p> CraetedAt: {item.timeStamp}</p>
          </div>
          <div className="flex gap-2 m-1">
            <Link to={`/todo/${item.id}`}>
              <button className="border-2 border-black">Edit</button>
              <button className="border-2 border-black">Mark as Done</button>
            </Link>
            <button
              onClick={() => handelDelete(item.id)}
              className="border-2 border-black"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
