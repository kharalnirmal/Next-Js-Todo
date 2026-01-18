"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTodoStore } from "@/store/todo-store";

const TodoFilter = () => {
  const { filter, setFilter, completedCount, activeCount } = useTodoStore();

  const filters = [
    { key: "all", label: "All", count: activeCount() + completedCount() },
    { key: "active", label: "Active", count: activeCount() },
    { key: "completed", label: "Completed", count: completedCount() },
  ];

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {filters.map(({ key, label, count }) => (
              <Button
                key={key}
                variant={filter === key ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(key)}
                className="relative"
              >
                {label}
                {count > 0 && (
                  <span className="bg-muted ml-2 px-2 py-0.5 rounded-full text-muted-foreground text-xs">
                    {count}
                  </span>
                )}
              </Button>
            ))}
          </div>

          <div className="text-muted-foreground text-sm">
            {activeCount()} active, {completedCount()} completed
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodoFilter;
