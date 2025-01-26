import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import TodoItem from "../TodoItem/TodoItem";
import classes from "./TodoList.module.css";

const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todo.todos);
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (listRef.current) {
      const lastTodo = listRef.current.lastElementChild;
      lastTodo?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [todos.length]);

  if (todos.length === 0) {
    return <p>No tasks to show. Start by adding a new task!</p>;
  }

  return (
    <ul className={classes.listwrap} ref={listRef}>
      {[...todos]
        .sort((a, b) => {
          return a.text.localeCompare(b.text);
        })
        .map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
    </ul>
  );
};

export default TodoList;
