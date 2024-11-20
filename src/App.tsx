import { useContext, useState } from "react";
import "./App.css";
import { Todo } from "./components/Todo/Todo";
import Button from "./components/Todo/Button/Button";
import { TodoContext } from "./contexts/TodoContext";
import FormModel from "./components/Model/TodoFormModel";
import AddTodoForm from "./components/Forms/AddTodoForm";
import { Link } from "react-router-dom";

function App() {
  const { completed, total, todoList, dispatch } = useContext(TodoContext);
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);

  return (
    <>
      <div>
        <h1>Todo App</h1>
      </div>
      <div className="app">
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <div>
            <p>
              Total Completed:
              {completed}
            </p>
            <p>Remaining: {total - completed}</p>
          </div>

          <button
            style={{
              margin: "10px",
              padding: "10px",
              outline: "none",
              borderRadius: "10px",
              backgroundColor: "red",
              fontSize: "14px",
              cursor: "pointer",
            }}
            onClick={() => {
              setIsModelOpen(!isModelOpen);
            }}
          >
            Add Todo
          </button>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
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
                color: "red",
              }}
              onClick={() => {
                dispatch({
                  type: "clearAll",
                });
              }}
            >
              clearAll
            </Button>

            <Link
              to={"/chart"}
              style={{
                border: "none",
                padding: "10px",
                borderRadius: "10px",
                textAlign: "center",
                textDecoration: "none",
                fontSize: "14px",
                cursor: "pointer",
                color: "red",
                backgroundColor: "yellow",
              }}
            >
              Finish
            </Link>
          </div>
          {isModelOpen && (
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                bottom: "0",
                right: "0",
                backgroundColor: "rgba(18, 6, 12, 0.8)",
              }}
            >
              <FormModel setIsModelOpen={setIsModelOpen}>
                <AddTodoForm
                  setIsModelOpen={setIsModelOpen}
                  dispatch={dispatch}
                />
              </FormModel>
            </div>
          )}
        </div>

        {todoList.length > 0 ? (
          <Todo todoList={todoList} dispatch={dispatch} />
        ) : (
          <h2>Please add item to display list</h2>
        )}
      </div>
    </>
  );
}

export default App;
