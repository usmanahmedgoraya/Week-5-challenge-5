import { create } from 'zustand'


const useTodoStore = create((set) => ({
  todos: [],
  loading: false,
  error: null,
  // Fetch todos from the backend
  fetchTodos: async () => {
    set({ loading: true });
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        return console.log("Not Authorized")
      }
      const response = await fetch('http://localhost:3000/api/notes/get-todo', {
        method: "get",
        headers: {
          "content-type": "application/json",
          "token": token
        }
      });
      const data = await response.json()
      console.log(data);
      set({ todos: data, loading: false, error: null });
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  // Add a new todo
  addTodo: async (newTodo) => {
    set({ loading: true });
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        return console.log("Not Authorized")
      }
      const response = await fetch('http://localhost:3000/api/notes/create-todo', {
        method: "post",
        headers: {
          "content-type": "application/json",
          "token": token
        },
        body: JSON.stringify(newTodo)
      });
      const data = await response.json()
      console.log(data);
      set((state) => ({ todos: [...state.todos, data], loading: false, error: null }));
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  // Remove a todo
  removeTodo: async (id) => {
    set({ loading: true });
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        return console.log("Not Authorized")
      }
      const response = await fetch(`http://localhost:3000/api/notes/delete-todo/${id}`, {
        method: "post",
        headers: {
          "content-type": "application/json",
          "token": token
        }
      });
      console.log(await response.json());
      set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id), loading: false, error: null }));
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },
  // Update a todo
  updateTodo: async (id, updatedTodo) => {
    set({ loading: true });
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return console.log("Not Authorized");
      }

      const response = await fetch(`http://localhost:3000/api/notes/update-todo/${id}`, {
        method: "put",
        headers: {
          "content-type": "application/json",
          "token": token,
        },
        body: JSON.stringify(updatedTodo),
      });

      const data = await response.json();
      console.log(data);

      set((state) => ({
        todos: state.todos.map((todo) => (todo.id === id ? data : todo)),
        loading: false,
        error: null,
      }));
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },
}));

export default useTodoStore;