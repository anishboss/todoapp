import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import generateRandomNumber from "../../utils/generateRandomNumber";
import { getLocalStorage } from "../../utils/localStorage.util";
import { ITodoItem } from "../../types";

const initialTodoList: ITodoItem[] = getLocalStorage("todoList");

export const todoSlice = createSlice({
  name: "todoList",
  initialState: {
    todoList: initialTodoList ?? [],
  },
  reducers: {
    added: (state, action: PayloadAction<{ item: string }>) => {
      state.todoList = [
        {
          id: generateRandomNumber(),
          item: action.payload.item,
          isCompleted: false,
        },
        ...state.todoList,
      ];
    },
    updateTodo: (
      state,
      action: PayloadAction<{ id: number; item: string }>
    ) => {
      state.todoList = state.todoList.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, item: action.payload.item }
          : todo
      );
    },
    remove: (state, action: PayloadAction<{ id: number }>) => {
      state.todoList = state.todoList.filter(
        (todo) => todo.id !== action.payload.id
      );
    },
    toogleComplete: (
      state,
      action: PayloadAction<{
        id: number;
      }>
    ) => {
      state.todoList = state.todoList.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      );
    },
    clearAll: (state) => {
      state.todoList = [];
    },
  },
});

export const { added, updateTodo, remove, toogleComplete, clearAll } =
  todoSlice.actions;

export default todoSlice.reducer;
