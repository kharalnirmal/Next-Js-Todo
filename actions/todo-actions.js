"use server";

import { revalidatePath } from "next/cache";

import Todo from "@/model/todo"; // Import the function
import { createTodoSchema } from "@/validations/todo";
import connectDB from "@/lib/db";

export async function createTodo(data) {
  try {
    await connectDB(); // Connect first

    const validatedData = createTodoSchema.parse(data);
    const todo = await Todo.create(validatedData);

    revalidatePath("/");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(todo)),
    };
  } catch (error) {
    console.error("Error creating todo:", error);
    return {
      success: false,
      error: error?.message || "Failed to create todo",
    };
  }
}

export async function getTodos() {
  try {
    await connectDB();

    const todos = await Todo.find({}).sort({ createdAt: -1 });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(todos)),
    };
  } catch (error) {
    console.error("Error fetching todos:", error);
    return {
      success: false,
      error: "Failed to fetch todos",
    };
  }
}

export async function toggleTodo(id) {
  try {
    await connectDB();

    const todo = await Todo.findById(id);

    if (!todo) {
      return {
        success: false,
        error: "Todo not found",
      };
    }

    todo.completed = !todo.completed;

    await todo.save();

    revalidatePath("/");
    return {
      success: true,
      data: JSON.parse(JSON.stringify(todo)),
    };
  } catch (error) {
    console.error("Error toggling todo:", error);
    return {
      success: false,
      error: "Failed to toggle todo",
    };
  }
}

export async function deleteTodo(id) {
  try {
    await connectDB();

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return {
        success: false,
        error: "Todo not found",
      };
    }
    revalidatePath("/");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(todo)),
    };
  } catch (error) {
    console.error("Error deleting todo:", error);
    return {
      success: false,
      error: "Failed to delete todo",
    };
  }
}
