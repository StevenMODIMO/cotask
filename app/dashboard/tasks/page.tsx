import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tasks",
};

import React, { Suspense } from "react";
import AddTask from "@/components/add-task";
import TasksLists from "@/components/tasks-list";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Tasks({
  searchParams,
}: {
  searchParams: Promise<{ view?: "list" | "grid" }>;
}) {
  const { view = "list" } = await searchParams;
  console.log(view);
  return (
    <div>
      <header className="text-2xl font-medium">
        <h1>Tasks</h1>
      </header>
      <AddTask />
      <Suspense
        fallback={
          <Skeleton className="h-4 w-50 bg-gray-200 dark:bg-[#383737]" />
        }
      >
        <TasksLists view={view} />
      </Suspense>
    </div>
  );
}
