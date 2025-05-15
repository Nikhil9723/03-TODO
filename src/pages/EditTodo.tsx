import getTimestamp from "../utils/TimeStamp";
import { TodoContext } from "../store/Context";
import type { TodoList } from "../types/reducerTypes";
import { useContext, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface EditTodoId {
  [id: string]: string;
}

export default function EditTodo() {
  const [isEditing, setIsEditing] = useState(false);

  const { todos, dispatch } = useContext(TodoContext);
  const editTodoId = useParams<EditTodoId>();
  console.log(editTodoId.id, "Hii");
  const editableTitle = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  function handelEditTodo() {
    setIsEditing(true);
  }

  function handelOnBlur(editId: string) {
    const currentTime = getTimestamp();
    dispatch({
      type: "Edit_todos",
      payload: {
        id: editId,
        title: editableTitle.current!.value,
        timeStamp: currentTime,
      },
    });
    navigate("/todo");
  }

  function handelPendingTask() {
    dispatch({
      type: "MARK_AS_DONE",
      payload: { id: editTodoId.id!, status: "Completed" },
    });
  }

  return (
    <>
      <div>
        {todos.map((item: TodoList, index: number) => {
          if (item.id === editTodoId.id) {
            return (
              <div key={item.id} className="border-2 border-black w-full m-2">
                <div className="flex flex-col">
                  id:{index + 1}
                  {isEditing ? (
                    <p>
                      title:
                      {
                        <input
                          onBlur={() => handelOnBlur(editTodoId.id!)}
                          ref={editableTitle}
                          type="text"
                          className="border-2 border-black"
                        />
                      }
                    </p>
                  ) : (
                    <p>title: {item.title}</p>
                  )}
                  <p>{item.status}</p>
                  <p>{item.timeStamp}</p>
                </div>
                <button
                  onClick={handelPendingTask}
                  className="border-2 border-black"
                >
                  Mark as Done
                </button>
                <button onClick={handelEditTodo}>Edit</button>
              </div>
            );
          }
        })}
      </div>
    </>
  );
}
