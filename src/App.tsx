import { useState, Dispatch, SetStateAction, FormEvent } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

type todo = {
  id: number;
  task: string;
  done: boolean;
};

const App = () => {
  const [todos, setTodos] = useState<todo[]>([]);
  const [idCounter, setIdCounter] = useState<number>(0);

  const handleChangeCheckBox = (id: number) => {
    const changedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, done: !todo.done };
      }
      return todo;
    });
    setTodos(changedTodos);
  };

  const handleDeleteClick = (id: number) => {
    return setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <Logos />
      <TodoForm
        idCounter={idCounter}
        setIdCounter={setIdCounter}
        todos={todos}
        setTodos={setTodos}
      />
      <TodoList
        todos={todos}
        onChangeCheckBox={handleChangeCheckBox}
        onDeleteClick={handleDeleteClick}
      />
    </>
  );
};

export default App;

const Logos = () => {
  return (
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
    </div>
  );
};

type TodoFormProps = {
  idCounter: number;
  setIdCounter: Dispatch<SetStateAction<number>>;
  todos: todo[];
  setTodos: Dispatch<SetStateAction<todo[]>>;
};

const TodoForm = ({
  idCounter,
  setIdCounter,
  todos,
  setTodos,
}: TodoFormProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputText = e.currentTarget.task.value;
    if (inputText === "") {
      return;
    }
    const nextId = idCounter + 1;
    setIdCounter(nextId);
    setTodos([...todos, { id: nextId, task: inputText, done: false }]);
    e.currentTarget.task.value = "";
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input name="task" />
      <button>登録</button>
    </form>
  );
};

type TodoListProps = {
  todos: todo[];
  onChangeCheckBox: (id: number) => void;
  onDeleteClick: (id: number) => void;
};

const TodoList = ({
  todos,
  onChangeCheckBox,
  onDeleteClick,
}: TodoListProps) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li
          className={`${todo.done ? "checked" : ""} todo`}
          key={`todo${todo.id}`}
        >
          <input
            type="checkbox"
            onChange={() => {
              onChangeCheckBox(todo.id);
            }}
          />
          <label>{todo.task}</label>
          <button
            onClick={() => {
              onDeleteClick(todo.id);
            }}
          >
            削除
          </button>
        </li>
      ))}
    </ul>
  );
};
