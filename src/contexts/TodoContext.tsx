import { createContext, ReactNode, useContext, useReducer } from "react";
import generateRandomNumber from "../utils/generateRandomNumber";

export interface ITodoItem {
  id: number;
  item: string;
  isCompleted: boolean;
}

type TodoAction =
  | { type: "added"; payload: { item: string } }
  | { type: "updateTodo"; payload: { id: number; item: string } }
  | { type: "remove"; payload: { id: number } }
  | { type: "toogleComplete"; payload: { id: number } }
  | { type: "clearAll" };

const initialTodoList: ITodoItem[] = [];

export const TodoContext = createContext<ITodoItem[]>([]);
export const TodoDispatchContext = createContext<React.Dispatch<TodoAction>>(
  () => {
    throw new Error("TodoDispatchContext must be used within a TodoProvider");
  }
);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todoList, dispatch] = useReducer(todoReducer, initialTodoList);

  return (
    <TodoContext.Provider value={todoList}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoContext.Provider>
  );
}

export function useTodoList() {
  return useContext(TodoContext);
}

export function useTodoDispatch() {
  return useContext(TodoDispatchContext);
}

export function todoReducer(
  todoList: ITodoItem[],
  action: TodoAction
): ITodoItem[] {
  switch (action.type) {
    case "added": {
      return [
        ...todoList,
        {
          id: generateRandomNumber(),
          item: action.payload?.item,
          isCompleted: false,
        },
      ];
    }
    case "updateTodo": {
      return todoList.map((todo) => {
        if (todo.id === action.payload?.id) {
          return { ...todo, item: action.payload.item };
        }
        return todo;
      });
    }
    case "remove": {
      return todoList.filter((todo) => todo.id !== action.payload?.id);
    }
    case "toogleComplete": {
      return todoList.map((todo) => {
        if (todo.id === action.payload?.id) {
          return {
            ...todo,
            isCompleted: !todo.isCompleted,
          };
        }
        return todo;
      });
    }
    case "clearAll": {
      return [];
    }
    default: {
      throw todoList;
    }
  }
}
