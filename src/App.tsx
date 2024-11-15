import { useRef, useState } from "react";
import "./App.css";
import { Todo } from "./components/Todo/Todo";
import Button from "./components/Todo/Button/Button";
import { setLocalStorage } from "./utils/localStorage.util";
import { useDispatch, useSelector } from "react-redux";
import { added, clearAll, updateTodo } from "./app/slices/todoSlice";
import { ITodoItem } from "./types";
import { RootState } from "./app/store";

function App() {
  const todoList: ITodoItem[] = useSelector(
    (state: RootState) => state.todo.todoList
  );
  const dispatch = useDispatch();
  const [item, setItem] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number>(0);

  const editRef = useRef<HTMLInputElement>(null);
  const totalCompleted = todoList.filter((todo) => todo.isCompleted).length;

  setLocalStorage("todoList", todoList);

  function activateEditing(id: number, item: string) {
    setIsEditing(true);
    editRef.current?.focus();
    setEditingId(id);
    setItem(item);
  }

  function editTodo(id: number) {
    if (typeof id == "number") {
      if (!item) return;
      dispatch(updateTodo({ id, item }));
      setItem("");
      setIsEditing(false);
    }
  }

  return (
    <>
      <div>
        <h1>Todo App</h1>
      </div>
      <div className="app">
        <div>
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
              ref={editRef}
              value={item}
              onChange={(e) => setItem(e.target.value)}
              placeholder="Enter todo item"
            />
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
              onClickfunc={
                isEditing
                  ? () => editTodo(editingId)
                  : () => {
                      if (!item) return;
                      dispatch(added({ item }));
                      setItem("");
                    }
              }
            >
              {isEditing ? "Edit" : "Add"}
            </Button>
          </form>
        </div>
        {todoList.length > 0 ? (
          <div>
            <Todo todoList={todoList} activateEditing={activateEditing} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <p>
                Total Completed:
                {totalCompleted}
              </p>
              <Button
                styleType={{
                  border: "none",
                  padding: "10px",
                  borderRadius: "10px",
                  textAlign: "center",
                  textDecoration: "none",
                  fontSize: "14px",
                  cursor: "pointer",
                  color: "red",
                }}
                onClickfunc={() => {
                  dispatch(clearAll());
                  setItem("");
                  setIsEditing(false);
                }}
              >
                clearAll
              </Button>
              <p>Remaining: {todoList.length - totalCompleted}</p>
            </div>
          </div>
        ) : (
          <h2>Please add item to display list</h2>
        )}
      </div>
    </>
  );
}

export default App;
