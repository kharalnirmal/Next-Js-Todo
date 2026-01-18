import { createTodo } from "@/actions/todo-actions";
import { useTodoStore } from "@/store/todo-store";
import { createTodoSchema } from "@/validations/todo";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const todoKeys = {
  all: ["todo"],
  lists: () => [...todoKeys.all, "list"],
};

export function useCreateTodo() {
  const queryClient = useQueryClient();

  const addTodo = useTodoStore((state) => state.addTodo);

  return useMutation({
    mutationFn: (data) => createTodo(data),
    onSuccess: (result) => {
      if (result.success) {
        addTodo(result.data);
        queryClient.invalidateQueries({ queryKey: todoKeys.lists() });
      }
    },
  });
}

// export function useTodo(){
//     const setTodos = useTodoStore((state)=>state.setTodos)
// }
