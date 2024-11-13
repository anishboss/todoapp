import { TodoItem } from "./TodoItem";

export interface ITodoItem {
  id: number;
  item: string;
  isCompleted: boolean;
}
export interface ITodoProps {
  todoList: ITodoItem[];
  removeTodo: (id: number) => void;
  toogleComplete: (id: number) => void;
  activateEditing: (id: number, item: string) => void;
}

export const Todo: React.FC<ITodoProps> = ({
  todoList,
  removeTodo,
  toogleComplete,
  activateEditing,
}) => {
  return (
    <>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1px",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px",
          textDecoration: "none",
          listStyle: "none",
        }}
      >
        {todoList.map((todo: ITodoItem) => (
          <TodoItem
            todo={todo}
            removeTodo={removeTodo}
            toogleComplete={toogleComplete}
            activateEditing={activateEditing}
            key={todo.id}
          />
        ))}
      </ul>
    </>
  );
};
