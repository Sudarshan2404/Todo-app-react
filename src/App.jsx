import React, { useEffect, useState } from "react";

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

  console.log(todos[0]);
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

          {todos.map((todo) => {
            return (
              <>
                <div></div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default App;
