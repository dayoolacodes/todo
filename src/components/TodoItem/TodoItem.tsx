import React, { useState } from "react";
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
  const [isFading, setIsFading] = useState(false);

  const handleDeleteTodo = () => {
    setIsFading(true);
    setTimeout(() => {
      dispatch(deleteTodo(id)); 
    }, 800);
  };

  return (
    <li className={`${classes.list} ${isFading ? classes.fadeout : ""}`}>
      <span
        style={{
          textDecoration: completed ? "line-through" : "none",
          cursor: "pointer"
        }}
        onClick={() => dispatch(toggleTodo(id))}
      >
        {text}
      </span>
      <button onClick={handleDeleteTodo}>Remove</button>
      {completed ? <span> done ✔️ </span> : <span />}
    </li>
  );
};

export default TodoItem;
