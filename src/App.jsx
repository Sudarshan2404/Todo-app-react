import React, { useEffect, useState } from "react";
import trash from "./assets/trash3.svg";

const App = () => {
  const [todos, settodos] = useState(() => {
    const items = localStorage.getItem("todos");
    return items ? JSON.parse(items) : [];
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newTodo = { id: todos.length, todo: input.trim(), done: false };
    settodos((prev) => [...prev, newTodo]);
    setInput("");
  };
  let check = false;

  console.log(todos[0]);
  console.log(check);
  return (
    <>
      <div className="box">
        <div className="todo">
          <h1 className="title">To Do List</h1>
          <div className="form">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="todo"
                id="todo-f"
                placeholder="Add a new task"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" id="todo-btn">
                Add
              </button>
            </form>
          </div>
          <div style={{ marginBottom: "15px" }}>
            {todos.length === 0 && (
              <>
                <p
                  style={{
                    color: "#888",
                    textAlign: "center",
                    margin: "15px",
                    fontSize: "18px",
                  }}
                >
                  Your list is empty
                </p>
              </>
            )}
            {todos.map((todo) => {
              return (
                <>
                  <div className="todo-list">
                    <div className="set">
                      <input
                        type="checkbox"
                        checked={todo.done}
                        onChange={() => {
                          settodos((prev) =>
                            prev.map((t) =>
                              t.id === todo.id ? { ...t, done: !todo.done } : t
                            )
                          );
                        }}
                      />
                      <p
                        key={todo.id}
                        className="todo-item"
                        style={{
                          textDecoration: todo.done ? "line-through" : "none",
                        }}
                      >
                        {todo.todo}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        settodos((prev) =>
                          prev.filter((t) => t.id !== todo.id)
                        );
                      }}
                    >
                      <img src={trash} alt="trash can" id="trash" />
                    </button>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
