"use client";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { createTodoSchema } from "@/validations/todo";
import { useCreateTodo } from "@/hooks/use-create-todo";
import { toast } from "sonner";

const TodoForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const createTodoMutation = useCreateTodo();

  const form = useForm({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
    },
  });

  const onSubmit = async (data) => {
    try {
      const result = await createTodoMutation.mutateAsync(data);

      if (result.success) {
        toast.success("Todo created successfully");
        form.reset();
        setIsOpen(false);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Failed to create todo");
    }
  };

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="mb-6 w-full" size="lg">
        Add New Todo
      </Button>
    );
  }
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Create New Todo</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              {...form.register("title")}
              placeholder="Enter todo title..."
            />
            {form.formState.errors.title && (
              <p className="mt-1 text-destructive text-sm">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...form.register("description")}
              placeholder="Enter description (optional)..."
              rows={3}
            />
            {form.formState.errors.description && (
              <p className="mt-1 text-destructive text-sm">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={form.watch("priority")}
              onValueChange={(value) => form.setValue("priority", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={createTodoMutation.isPending}>
              {createTodoMutation.isPending ? "Creating..." : "Create Todo"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsOpen(false);
                form.reset();
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TodoForm;
