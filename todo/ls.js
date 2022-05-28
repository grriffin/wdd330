const key = 'todoitems';

export function loadTodos() {
  const todoString = localStorage.getItem(key);
  if (todoString) {
    return JSON.parse(todoString);
  }

  return [];
}

export function saveTodos(todos) {
  const todoString = JSON.stringify(todos);
  localStorage.setItem(key, todoString);
}
