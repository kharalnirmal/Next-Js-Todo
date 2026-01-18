import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useTodoStore = create(
  devtools(
    (set, get) => ({
      todos: [],
      filter: "all",
      isLoading: false,

      setTodos: (todos) => set({ todos }),

      addTodo: (todo) =>
        set((state) => ({
          todos: [todo, ...state.todos], // FIXED
        })),

      setFilter: (filter) => set({ filter }),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    { name: "todo-store" },
  ),
);
