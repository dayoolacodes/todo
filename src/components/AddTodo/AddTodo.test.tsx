import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import AddTodo from "./AddTodo";
import { addTodo } from "../../redux/todoSlice";
import "@testing-library/jest-dom";

const mockStore = configureStore([]);
const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch
}));

const store = mockStore({ todo: { todos: [] } });

describe("AddTodo Component", () => {
  it("renders input and button", () => {
    render(
      <Provider store={store}>
        <AddTodo />
      </Provider>
    );

    expect(screen.getByPlaceholderText(/add a new task/i)).toBeInTheDocument();
    expect(screen.getByText(/add/i)).toBeInTheDocument();
  });

  it("dispatches addTodo when valid input is submitted", () => {
    render(
      <Provider store={store}>
        <AddTodo />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/add a new task/i);
    fireEvent.change(input, { target: { value: "New Task" } });

    const button = screen.getByText(/add/i);
    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledWith(addTodo("New Task"));
  });

  it("should disable the Add button when input is empty", () => {
    render(
      <Provider store={store}>
        <AddTodo />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Add a new task...") as HTMLInputElement;
    const button = screen.getByText("Add") as HTMLButtonElement;

    expect(button).toBeDisabled();

    fireEvent.change(input, { target: { value: "New task" } });

    expect(button).toBeEnabled();
  });
});
