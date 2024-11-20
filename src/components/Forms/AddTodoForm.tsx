import React, { useEffect, useRef, useState } from "react";
import { TodoAction } from "../../contexts/TodoContext";

interface ITodoFormProps {
  setIsModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dispatch: React.Dispatch<TodoAction>;
}

const AddTodoForm = ({ setIsModelOpen, dispatch }: ITodoFormProps) => {
  const [item, setItem] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <h1>Hey Add your Todo</h1>
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
          placeholder="Enter todo item"
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
              type: "added",
              payload: {
                item,
              },
            });
            setIsModelOpen(false);
          }}
        >
          Add
        </button>
      </form>
    </>
  );
};

export default AddTodoForm;
