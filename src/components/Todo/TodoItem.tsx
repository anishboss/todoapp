import Button from "./Button/Button";

export interface ITodoItemProps {
  todo: {
    id: number;
    item: string;
    isCompleted: boolean;
  };
  removeTodo: (id: number) => void;
  toogleComplete: (id: number) => void;
  activateEditing: (id: number, item: string) => void;
}
export const TodoItem: React.FC<ITodoItemProps> = ({
  todo,
  removeTodo,
  toogleComplete,
  activateEditing,
}) => {
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
        <span onClick={() => toogleComplete(todo.id)}>
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
          onClickfunc={() => removeTodo(todo.id)}
        >
          Delete
        </Button>
      </div>
    </li>
  );
};
