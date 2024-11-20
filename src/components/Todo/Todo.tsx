import { ITodoItem, TodoAction } from "../../contexts/TodoContext";
import { TodoItem } from "./TodoItem";

export interface ITodoProps {
  todoList: ITodoItem[];
  dispatch: React.Dispatch<TodoAction>;
}

export const Todo: React.FC<ITodoProps> = ({ todoList, dispatch }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        gap: "1px",
        margin: "40px",
        textDecoration: "none",
        listStyle: "none",
        height: "400px",
        overflow: "hidden",
        overflowY: "scroll",
        padding: "10px",
        borderRadius: "20px",
        backgroundColor: "white",
      }}
    >
      {todoList.map((todo: ITodoItem) => (
        <TodoItem todo={todo} key={todo.id} dispatch={dispatch} />
      ))}
    </div>
  );
};
