import React, { useEffect, useState } from "react";
import AddTodo from "./components/AddTodo/AddTodo";
import { Provider } from "react-redux";
import { store } from "./redux/store"; // Adjust to your store path
import TodoList from "./components/TodoList/TodoList";
import "./App.css";

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Check the theme in localStorage on load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.body.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    const newTheme = !isDarkMode ? "dark" : "light";
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  return (
    <Provider store={store}>
      <div className="App">
        <h1>To-Do App</h1>
        <button key={isDarkMode ? "dark" : "light"} className="themeswitch" onClick={toggleTheme}>
          <img
            src={
              isDarkMode
                ? "public/assets/light-on-bulb-dark-mode.svg"
                : "./assets/light-on-bulb-light-mode.svg"
            }
            alt={isDarkMode ? "Light" : "Dark"}
          />
        </button>
        <AddTodo />
        <TodoList />
      </div>
    </Provider>
  );
};

export default App;
