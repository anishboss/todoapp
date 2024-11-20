import Button from "./Button/Button";
import { ITodoItem, TodoAction } from "../../contexts/TodoContext";
import { useState } from "react";
import FormModel from "../Model/TodoFormModel";
import EditTodoForm from "../Forms/EditTodoForm";

export interface ITodoItemProps {
  todo: ITodoItem;
  dispatch: React.Dispatch<TodoAction>;
}
export const TodoItem: React.FC<ITodoItemProps> = ({ todo, dispatch }) => {
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);

  if (isModelOpen)
    return (
      <div>
        {isModelOpen && (
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              bottom: "0",
              right: "0",
              backgroundColor: "rgba(18, 6, 12, 0.8)",
            }}
          >
            <FormModel setIsModelOpen={setIsModelOpen}>
              <EditTodoForm
                todo={todo}
                setIsModelOpen={setIsModelOpen}
                dispatch={dispatch}
              />
            </FormModel>
          </div>
        )}
      </div>
    );

  return (
    <>
      {isModelOpen && (
        <div>
          {isModelOpen && (
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                bottom: "0",
                right: "0",
                backgroundColor: "rgba(18, 6, 12, 0.8)",
              }}
            >
              <FormModel setIsModelOpen={setIsModelOpen}>
                <EditTodoForm
                  todo={todo}
                  setIsModelOpen={setIsModelOpen}
                  dispatch={dispatch}
                />
              </FormModel>
            </div>
          )}
        </div>
      )}
      <li
        key={todo.id}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "greenyellow",
          border: "1px solid black",
          borderRadius: "6px",
          minWidth: "98%",
          textDecoration: "none",
          padding: "0px 10px",
        }}
      >
        <p
          style={
            todo.isCompleted
              ? { fontSize: "16px", textDecoration: "line-through" }
              : { fontSize: "16px", textDecoration: "none" }
          }
        >
          <span
            onClick={() => {
              dispatch({
                type: "toogleComplete",
                payload: { id: todo.id },
              });
            }}
          >
            <input
              type="checkbox"
              name="isCompleted"
              id=""
              checked={todo.isCompleted}
              onChange={() => todo.isCompleted}
            />
          </span>
          {todo.item}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2px",
          }}
        >
          <Button
            styleType={{
              border: "none",
              padding: "10px",
              borderRadius: "10px",
              textAlign: "center",
              textDecoration: "none",
              fontSize: "14px",
              cursor: "pointer",
            }}
            onClick={() => setIsModelOpen(!isModelOpen)}
          >
            Edit
          </Button>
          <Button
            styleType={{
              border: "none",
              padding: "10px",
              borderRadius: "10px",
              textAlign: "center",
              textDecoration: "none",
              fontSize: "14px",
              cursor: "pointer",
            }}
            onClick={() => {
              dispatch({
                type: "remove",
                payload: {
                  id: todo.id,
                },
              });
            }}
          >
            Delete
          </Button>
        </div>
      </li>
    </>
  );
};
