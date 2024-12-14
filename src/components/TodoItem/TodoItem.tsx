import React from "react";
import { useDispatch } from "react-redux";
import { toggleTodo, deleteTodo } from "../../redux/todoSlice";
import classes from "./TodoItem.module.css";

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed }) => {
  const dispatch = useDispatch();

  return (
    <li className={classes.list}>
      <span
        style={{ textDecoration: completed ? "line-through" : "none", cursor: "pointer" }}
        onClick={() => dispatch(toggleTodo(id))}
      >
        {text}
      </span>
      {completed && <span> completed ✔️ </span>}
      <button onClick={() => dispatch(deleteTodo(id))}>Remove</button>
    </li>
  );
};

export default TodoItem;
