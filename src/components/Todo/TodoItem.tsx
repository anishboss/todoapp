import Button from "./Button/Button";
import { ITodoItem, useTodoDispatch } from "../../contexts/TodoContext";

export interface ITodoItemProps {
  todo: ITodoItem;
  activateEditing: (id: number, item: string) => void;
}
export const TodoItem: React.FC<ITodoItemProps> = ({
  todo,
  activateEditing,
}) => {
  const dispatch = useTodoDispatch();

  return (
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
          onClick={() =>
            dispatch({
              type: "toogleComplete",
              payload: { id: todo.id },
            })
          }
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
          onClickfunc={() => activateEditing(todo.id, todo.item)}
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
          onClickfunc={() => {
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
  );
};
