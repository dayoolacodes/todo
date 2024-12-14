import React from "react";
import AddTodo from "./components/AddTodo/AddTodo";
import TodoList from "./components/TodoList/TodoList";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>To-Do App</h1>
      <AddTodo />
      <TodoList />
    </div>
  );
};

export default App;
