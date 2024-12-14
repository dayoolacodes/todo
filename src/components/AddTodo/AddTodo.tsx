import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../../redux/todoSlice";
import { RootState } from "../../redux/store";

const AddTodo: React.FC = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todo.todos);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChangeText = (txt: string) => {
    setText(txt);
    if (error) setError(null);
  };

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedText = text.trim();

    if (!trimmedText) {
      setError("Task cannot be empty.");
      return;
    }

    if (todos.some((todo) => todo.text.toLowerCase() === trimmedText.toLowerCase())) {
      setError("Task already exists.");
      return;
    }

    dispatch(addTodo(trimmedText));
    setText("");
    setError(null); // Clear error on successful add
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form onSubmit={handleAddTodo}>
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => handleChangeText(e.target.value)}
        placeholder="Add a new task..."
      />
      <button type="submit" disabled={!text.trim()}>
        Add
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default AddTodo;
