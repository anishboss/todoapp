import React, { useEffect, useRef, useState } from "react";
import { ITodoItem, TodoAction } from "../../contexts/TodoContext";

interface ITodoEditFormProps {
  todo: ITodoItem;
  setIsModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dispatch: React.Dispatch<TodoAction>;
}

const EditTodoForm = ({
  todo,
  setIsModelOpen,
  dispatch,
}: ITodoEditFormProps) => {
  const [item, setItem] = useState<string>(todo.item);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <h1>Edit your Todo</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "10px",
            outline: "none",
          }}
          type="text"
          name="item"
          ref={inputRef}
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="Edit todo item"
        />
        <button
          style={{
            border: "none",
            padding: "10px",
            borderRadius: "10px",
            textAlign: "center",
            textDecoration: "none",
            fontSize: "14px",
            cursor: "pointer",
          }}
          onClick={() => {
            if (!item) return;
            dispatch({
              type: "updateTodo",
              payload: {
                id: todo.id,
                item,
              },
            });
            setIsModelOpen(false);
          }}
        >
          Edit
        </button>
      </form>
    </>
  );
};

export default EditTodoForm;
