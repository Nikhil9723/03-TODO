import type { TodoList } from "../types/reducerTypes";

import { Link } from "react-router-dom";
import { Status } from "../constants/constants";
import { useDispatch } from "react-redux";
import { deleteTodo, markAsDone } from "../store/store";

type ChildType = {
  filterTodos: TodoList[];
};

export default function TodoItems({ filterTodos }: ChildType) {
  const dispatch = useDispatch();

  function handleDelete(targetId: string) {
    dispatch(deleteTodo({ id: targetId }));
  }

  function handleEditStatus(targetId: string) {
    dispatch(markAsDone({ id: targetId, status: "Completed" }));
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filterTodos.map((item: TodoList, index) => (
          <div
            key={item.id}
            className="w-full bg-white border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="space-y-3">
              <p className="text-sm text-gray-500">#{index + 1}</p>
              <h2 className="text-xl font-medium text-gray-800 truncate">
                {item.title}
              </h2>
              <p className="text-sm text-blue-600 font-medium">
                Status: <span className="capitalize">{item.status}</span>
              </p>
              <p className="text-xs text-gray-400">Created: {item.timeStamp}</p>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              <Link to={`/todo/${item.id}`} className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm font-medium">
                  Edit
                </button>
              </Link>
              {item.status === Status.PENDING ? (
                <button
                  onClick={() => handleEditStatus(item.id)}
                  className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition text-sm font-medium"
                >
                  Mark as Done
                </button>
              ) : (
                <button className="w-full sm:w-auto px-4 py-2 bg-gray-600 text-white rounded-md hover:cursor-not-allowed transition text-sm font-medium">
                  Mark as Done
                </button>
              )}

              <button
                onClick={() => handleDelete(item.id)}
                className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
