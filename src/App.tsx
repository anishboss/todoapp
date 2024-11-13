import { useState } from "react";
import "./App.css";
import { Todo } from "./components/Todo/Todo";
import Button from "./components/Todo/Button/Button";
import generateRandomNumber from "./utils/generateRandomNumber";

function App() {
  const [todoList, setTodoList] = useState([
    {
      id: 1,
      item: "Wake Up",
      isCompleted: true,
    },
    {
      id: generateRandomNumber(),
      item: "Warm Up",
      isCompleted: false,
    },
  ]);
  const [item, setItem] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const totalCompleted = todoList.filter((todo) => todo.isCompleted).length;

  function addTodo() {
    if (item.length < 1) {
      return;
    }
    setTodoList([
      ...todoList,
      {
        id: generateRandomNumber(),
        item,
        isCompleted: false,
      },
    ]);
    setItem("");
  }

  function activateEditing(id: number, item: string) {
    setIsEditing(true);
    setEditingId(id);
    setItem(item);
  }

  function editTodo(id: number | null) {
    if (typeof id == "number") {
      updateItem(id);
    }
  }

  function updateItem(id: number) {
    const updatedItem = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, item: item };
      }
      return todo;
    });
    setTodoList(updatedItem);
    setItem("");
    setIsEditing(false);
  }

  function removeTodo(id: number) {
    const filteredTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(filteredTodoList);
  }

  function toogleComplete(id: number) {
    const toogledTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });
    setTodoList(toogledTodoList);
  }

  function removeAllTodo() {
    setTodoList([]);
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
              onClick={isEditing ? () => editTodo(editingId) : () => addTodo()}
            >
              {isEditing ? "Edit" : "Add"}
            </button>
          </form>
        </div>
        {todoList.length > 0 ? (
          <div>
            <Todo
              todoList={todoList}
              removeTodo={removeTodo}
              toogleComplete={toogleComplete}
              activateEditing={activateEditing}
            />
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
                onClickfunc={removeAllTodo}
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
