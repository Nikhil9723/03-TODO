import getTimestamp from "../utils/TimeStamp";
import type { TodoList } from "../types/reducerTypes";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Status } from "../constants/constants";
import back from "../assets/back.svg";
import { editTodo, markAsDone, type StateType } from "../store/sotre";
import { useDispatch, useSelector } from "react-redux";
interface EditTodoId {
  [id: string]: string;
}

export default function EditTodo() {
  const [isEditing, setIsEditing] = useState(true);
  const dispatch = useDispatch();
  const todos = useSelector((state: StateType) => state.Todo);

  const editTodoId = useParams<EditTodoId>();
  const editableTitle = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  function handelEditTodo() {
    setIsEditing(true);
  }

  useEffect(() => {
    if (isEditing) {
      editableTitle.current?.focus();
    }
  }, [isEditing]);

  function handelOnBlur(editId: string) {
    const currentTime = getTimestamp();
    dispatch(
      editTodo({
        id: editId,
        title: editableTitle.current!.value,
        timeStamp: currentTime,
      }),
    );
    setIsEditing(false);
  }

  function handelPendingTask() {
    dispatch(markAsDone({ id: editTodoId.id!, status: "Completed" }));
  }

  function handleBack() {
    navigate("/todo"); // This goes to the previous page
  }

  return (
    <>
      <div className="max-w-3xl mx-auto p-6">
        {todos.map((item: TodoList, index: number) => {
          if (item.id === editTodoId.id) {
            return (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg shadow-lg p-6"
              >
                <div className="flex flex-col space-y-4">
                  <p className="text-sm text-gray-500">ID: {index + 1}</p>
                  {isEditing ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Title:
                      </label>
                      <input
                        onBlur={() => handelOnBlur(editTodoId.id!)}
                        ref={editableTitle}
                        type="text"
                        className="w-full px-4 py-2 mt-1 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue={item.title}
                      />
                    </div>
                  ) : (
                    <p className="text-lg font-semibold text-gray-800">
                      Title: {item.title}
                    </p>
                  )}
                  <p className="text-md text-gray-600">Status: {item.status}</p>
                  <p className="text-sm text-gray-400">
                    Created: {item.timeStamp}
                  </p>
                </div>

                <div className="flex justify-center gap-4 box-border mt-6">
                  <button
                    onClick={handelEditTodo}
                    className="px-6 py-2 box-border bg-blue-600 text-white rounded-md hover:bg-blue-700 transition w-full sm:w-auto"
                  >
                    Edit
                  </button>

                  {item.status === Status.PENDING ? (
                    <button
                      onClick={handelPendingTask}
                      className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition w-full sm:w-auto"
                    >
                      Mark as Done
                    </button>
                  ) : (
                    <button
                      onClick={handelPendingTask}
                      className="px-6 py-3 bg-gray-600 text-white rounded-md hover:cursor-not-allowed transition w-full sm:w-auto"
                    >
                      Mark as Done
                    </button>
                  )}
                </div>
                <div className="flex justify-center mt-4">
                  <button
                    onClick={handleBack}
                    className="flex box-border w-full px-6 py-3 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition sm:w-auto"
                  >
                    <img className="w-7" src={back} />
                    Back
                  </button>
                </div>
              </div>
            );
          }
        })}
      </div>
    </>
  );
}
