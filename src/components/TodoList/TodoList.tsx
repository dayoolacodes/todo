import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import TodoItem from "../TodoItem/TodoItem";
import classes from "./TodoList.module.css";

const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todo.todos);

  if (todos.length === 0) {
    return <p>No tasks to show. Start by adding a new task!</p>;
  }

  return (
    <ol className={classes.listwrap} >
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ol>
  );
};

export default TodoList;
