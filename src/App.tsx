import { useState } from "react";
import "./App.css";
import { Todo } from "./components/Todo/Todo";
import Button from "./components/Todo/Button/Button";
import { useTodoList, useTodoDispatch } from "./contexts/TodoContext";

function App() {
  const todoList = useTodoList();
  const dispatch = useTodoDispatch();
  const [item, setItem] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number>(0);

  const totalCompleted = todoList.filter((todo) => todo.isCompleted).length;

  function activateEditing(id: number, item: string) {
    setIsEditing(true);
    setEditingId(id);
    setItem(item);
  }

  function editTodo(id: number) {
    if (typeof id == "number") {
      if (!item) return;
      dispatch({
        type: "updateTodo",
        payload: {
          id,
          item,
        },
      });
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
              value={item}
              onChange={(e) => setItem(e.target.value)}
              placeholder="Enter todo item"
            />
            <button
              style={{
                border: "none",
                padding: "10px",
                borderRadius: "10px",
                textAlign: "center",
                textDecoration: "none",
                fontSize: "14px",
                cursor: "pointer",
              }}
              onClick={
                isEditing
                  ? () => editTodo(editingId)
                  : () => {
                      if (!item) return;
                      dispatch({
                        type: "added",
                        payload: {
                          item,
                        },
                      });
                      setItem("");
                    }
              }
            >
              {isEditing ? "Edit" : "Add"}
            </button>
          </form>
        </div>
        {todoList.length > 0 ? (
          <div>
            <Todo todoList={todoList} activateEditing={activateEditing} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
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
                  dispatch({
                    type: "clearAll",
                  });
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
