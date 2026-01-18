import TodoForm from "@/components/todo-form";
import { Button } from "@/components/ui/button";
import connectDB from "@/lib/db";

export default async function Home() {
  await connectDB();

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto px-4 py-8 max-w-2xl container">
        <header className="mb-8 text-center">
          <h1 className="mb-2 font-bold text-foreground text-4xl">Todo APP</h1>
          <p className="text-muted-foreground">
            Built with Next.js, Zustand, Tanstack-Query, Zod & Mongoose
          </p>
        </header>

        <main>
          <TodoForm />
        </main>
      </div>
      <footer className="mt-12 text-muted-foreground text-sm text-center">
        <p>This app demonstrates CRUD operations with modern React patterns</p>
      </footer>
    </div>
  );
}
