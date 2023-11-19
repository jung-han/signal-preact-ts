import { useState } from "preact/hooks";
import { Todo, addTodo, todos, updateTodos } from "./signals/todos";

import { FunctionComponent } from "preact";
import { ChangeEvent } from "preact/compat";
import { useComputed } from "@preact/signals";

const TodoFilter = () => {
  return <div></div>;
};

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: FunctionComponent<TodoItemProps> = ({ todo }) => {
  const { name, done } = todo;

  const handleChangeCheckbox = (ev: ChangeEvent) => {
    const checked = (ev.target as HTMLInputElement).checked;

    updateTodos(todo.id, { name, done: checked });
  };

  return (
    <div>
      <input type="checkbox" checked={done} onChange={handleChangeCheckbox} />
      <span style={{ textDecoration: done ? "line-through" : "none" }}>
        {name}
      </span>
    </div>
  );
};

const TodoInput = () => {
  const [todoInput, setTodoInput] = useState("");

  const handleInputChange = (ev: ChangeEvent) => {
    setTodoInput((ev.target as HTMLInputElement).value);
  };

  const handleClickButton = () => {
    addTodo(todoInput);
    setTodoInput("");
  };

  return (
    <>
      <input type="text" value={todoInput} onChange={handleInputChange} />
      <button type="submit" onClick={handleClickButton}>
        Add
      </button>
    </>
  );
};

const TodoList = () => {
  return (
    <div>
      {todos.value.map((todo) => {
        return <TodoItem todo={todo} key={todo.id} />;
      })}
    </div>
  );
};

const TodoResult = () => {
  const totalCount = todos.value.length;
  const doneCount = useComputed(() => todos.value.filter(({ done }) => done))
    .value.length;

  return (
    <div>
      <p>총: {totalCount} 개</p>
      <p>잔여 작업: {totalCount - doneCount}</p>
      <p>완료: {doneCount}</p>
    </div>
  );
};

export function App() {
  return (
    <div>
      <TodoInput />
      <TodoFilter />
      <TodoList />
      <TodoResult />
    </div>
  );
}
