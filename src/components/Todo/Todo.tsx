import { ITodoItem } from "../../contexts/TodoContext";
import { TodoItem } from "./TodoItem";

export interface ITodoProps {
  todoList: ITodoItem[];
  activateEditing: (id: number, item: string) => void;
}

export const Todo: React.FC<ITodoProps> = ({ todoList, activateEditing }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1px",
        margin: "10px",
        textDecoration: "none",
        listStyle: "none",
      }}
    >
      {todoList.map((todo: ITodoItem) => (
        <TodoItem todo={todo} activateEditing={activateEditing} key={todo.id} />
      ))}
    </div>
  );
};
