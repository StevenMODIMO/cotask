import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tasks",
  description: "Task overview section of the web application.",
};

import React, { Suspense } from "react";
import AddTask from "@/components/add-task";
import TasksLists from "@/components/tasks-list";
import TaskSkeleton from "@/components/task-skeleton";

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
      <div className="flex flex-col gap-3">
        <AddTask />
        <Suspense fallback={<TaskSkeleton />}>
          <TasksLists key={view} view={view} />
        </Suspense>
      </div>
    </div>
  );
}
