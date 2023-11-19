import { signal } from "@preact/signals";

export interface Todo {
  name: string;
  done: boolean;
  id: string;
}

export const todos = signal<Todo[]>([]);

export const updateTodos = (id: string, newTodo: Omit<Todo, "id">) => {
  const newTodos = todos.value.map((todo) => {
    if (id !== todo.id) {
      return todo;
    }

    return {
      id,
      ...newTodo,
    };
  });

  todos.value = newTodos;
};

export const addTodo = (name: string) => {
  todos.value = [
    { done: false, name, id: crypto.randomUUID() },
    ...todos.value,
  ];
};
