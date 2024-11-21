import { createContext, ReactNode, useReducer } from "react";
import generateRandomNumber from "../utils/generateRandomNumber";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage.util";

export interface ITodoItem {
  id: number;
  item: string;
  isCompleted: boolean;
}
interface ITodoContextProps {
  todoList: ITodoItem[];
  dispatch: React.Dispatch<TodoAction>;
  total: number;
  completed: number;
}

export type TodoAction =
  | { type: "added"; payload: { item: string } }
  | { type: "updateTodo"; payload: { id: number; item: string } }
  | { type: "remove"; payload: { id: number } }
  | { type: "toogleComplete"; payload: { id: number } }
  | { type: "clearAll" };

const localTodoList: ITodoItem[] = getLocalStorage("todoList");
export const initialTodoList: ITodoItem[] = localTodoList || [];

// export const TodoContext = createContext<ITodoContextProps>(() => {
//   throw new Error("TodoContextProvider must be used before using TodoContext");
// });

export const TodoContext = createContext<ITodoContextProps>({
  todoList: initialTodoList,
  dispatch: () => ({}),
  total: 0,
  completed: 0,
});

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todoList, dispatch] = useReducer(todoReducer, initialTodoList);
  const totalCompletedTask = todoList.filter((todo) => todo.isCompleted).length;
  setLocalStorage("todoList", todoList);

  return (
    <TodoContext.Provider
      value={{
        todoList,
        dispatch,
        total: todoList.length,
        completed: totalCompletedTask,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function todoReducer(
  todoList: ITodoItem[],
  action: TodoAction
): ITodoItem[] {
  switch (action.type) {
    case "added": {
      return [
        {
          id: generateRandomNumber(),
          item: action.payload.item,
          isCompleted: false,
        },
        ...todoList,
      ];
    }
    case "updateTodo": {
      return todoList.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, item: action.payload.item };
        }
        return todo;
      });
    }
    case "remove": {
      return todoList.filter((todo) => todo.id !== action.payload.id);
    }
    case "toogleComplete": {
      return todoList.map((todo) => {
        if (todo.id === action.payload.id) {
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
