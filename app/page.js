import { Button } from "@/components/ui/button";
import connectDB from "@/lib/db";

export default async function Home() {
  await connectDB();

  return (
    <div>
      <Button>TODO APP</Button>
    </div>
  );
}
