export default class ToDoRepository {
  static #key = 'todoitems_v1';
  constructor() {

  }

  static getAll() {
    const todoString = localStorage.getItem(this.#key);
    if (todoString) {
      return JSON.parse(todoString);
    }

    return [];
  }

  static saveAll(todos) {
    const todoString = JSON.stringify(todos);
    localStorage.setItem(this.#key, todoString);
  }
  
}