import React, { Suspense } from "react";
import AddTask from "@/components/add-task";
import TasksLists from "@/components/tasks-list";
import { Skeleton } from "@/components/ui/skeleton";

export default function Tasks() {
  return (
    <div>
      <header className="text-2xl font-medium">
        <h1>Tasks</h1>
      </header>
      <div>
        <AddTask />{" "}
        <Suspense
          fallback={
            <Skeleton className="h-4 w-50 bg-gray-200 dark:bg-[#383737]" />
          }
        >
          <TasksLists />
        </Suspense>
      </div>
    </div>
  );
}
