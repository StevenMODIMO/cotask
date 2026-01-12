import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tasks",
};

import React, { Suspense } from "react";
import AddTask from "@/components/add-task";
import TasksLists from "@/components/tasks-list";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

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
        <Suspense
          fallback={
            <div className="flex flex-col gap-3 my-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:w-full">
              <Card className="dark:bg-[#262626]">
                <CardHeader>
                  <CardTitle>
                    <Skeleton className="h-2 w-48 bg-gray-200 dark:bg-[#383737]" />
                  </CardTitle>
                  <CardDescription>
                    <Skeleton className="h-1 w-60 bg-gray-200 dark:bg-[#383737]" />
                  </CardDescription>
                  <CardAction>
                    <Skeleton className="h-4 w-4 rounded bg-gray-200 dark:bg-[#383737]" />
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-2 w-10 bg-gray-200 dark:bg-[#383737]" />
                    <Skeleton className="h-2 w-10 bg-gray-200 dark:bg-[#383737]" />
                    <Skeleton className="h-2 w-10 bg-gray-200 dark:bg-[#383737]" />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2 items-start">
                  <Skeleton className="h-2 w-24 bg-gray-200 dark:bg-[#383737]" />
                  <Skeleton className="h-2 w-24 bg-gray-200 dark:bg-[#383737]" />
                </CardFooter>
              </Card>

              <Card className="dark:bg-[#262626]">
                <CardHeader>
                  <CardTitle>
                    <Skeleton className="h-2 w-48 bg-gray-200 dark:bg-[#383737]" />
                  </CardTitle>
                  <CardDescription>
                    <Skeleton className="h-1 w-60 bg-gray-200 dark:bg-[#383737]" />
                  </CardDescription>
                  <CardAction>
                    <Skeleton className="h-4 w-4 rounded bg-gray-200 dark:bg-[#383737]" />
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-2 w-10 bg-gray-200 dark:bg-[#383737]" />
                    <Skeleton className="h-2 w-10 bg-gray-200 dark:bg-[#383737]" />
                    <Skeleton className="h-2 w-10 bg-gray-200 dark:bg-[#383737]" />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2 items-start">
                  <Skeleton className="h-2 w-24 bg-gray-200 dark:bg-[#383737]" />
                  <Skeleton className="h-2 w-24 bg-gray-200 dark:bg-[#383737]" />
                </CardFooter>
              </Card>
              <Card className="hidden md:flex dark:bg-[#262626]">
                <CardHeader>
                  <CardTitle>
                    <Skeleton className="h-2 w-48 bg-gray-200 dark:bg-[#383737]" />
                  </CardTitle>
                  <CardDescription>
                    <Skeleton className="h-1 w-60 bg-gray-200 dark:bg-[#383737]" />
                  </CardDescription>
                  <CardAction>
                    <Skeleton className="h-4 w-4 rounded bg-gray-200 dark:bg-[#383737]" />
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-2 w-10 bg-gray-200 dark:bg-[#383737]" />
                    <Skeleton className="h-2 w-10 bg-gray-200 dark:bg-[#383737]" />
                    <Skeleton className="h-2 w-10 bg-gray-200 dark:bg-[#383737]" />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2 items-start">
                  <Skeleton className="h-2 w-24 bg-gray-200 dark:bg-[#383737]" />
                  <Skeleton className="h-2 w-24 bg-gray-200 dark:bg-[#383737]" />
                </CardFooter>
              </Card>
              <Card className="hidden lg:flex dark:bg-[#262626]">
                <CardHeader>
                  <CardTitle>
                    <Skeleton className="h-2 w-48 bg-gray-200 dark:bg-[#383737]" />
                  </CardTitle>
                  <CardDescription>
                    <Skeleton className="h-1 w-60 bg-gray-200 dark:bg-[#383737]" />
                  </CardDescription>
                  <CardAction>
                    <Skeleton className="h-4 w-4 rounded bg-gray-200 dark:bg-[#383737]" />
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-2 w-10 bg-gray-200 dark:bg-[#383737]" />
                    <Skeleton className="h-2 w-10 bg-gray-200 dark:bg-[#383737]" />
                    <Skeleton className="h-2 w-10 bg-gray-200 dark:bg-[#383737]" />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2 items-start">
                  <Skeleton className="h-2 w-24 bg-gray-200 dark:bg-[#383737]" />
                  <Skeleton className="h-2 w-24 bg-gray-200 dark:bg-[#383737]" />
                </CardFooter>
              </Card>
              <Card className="hidden lg:flex dark:bg-[#262626]">
                <CardHeader>
                  <CardTitle>
                    <Skeleton className="h-2 w-48 bg-gray-200 dark:bg-[#383737]" />
                  </CardTitle>
                  <CardDescription>
                    <Skeleton className="h-1 w-60 bg-gray-200 dark:bg-[#383737]" />
                  </CardDescription>
                  <CardAction>
                    <Skeleton className="h-4 w-4 rounded bg-gray-200 dark:bg-[#383737]" />
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-2 w-10 bg-gray-200 dark:bg-[#383737]" />
                    <Skeleton className="h-2 w-10 bg-gray-200 dark:bg-[#383737]" />
                    <Skeleton className="h-2 w-10 bg-gray-200 dark:bg-[#383737]" />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2 items-start">
                  <Skeleton className="h-2 w-24 bg-gray-200 dark:bg-[#383737]" />
                  <Skeleton className="h-2 w-24 bg-gray-200 dark:bg-[#383737]" />
                </CardFooter>
              </Card>
            </div>
          }
        >
          <TasksLists view={view} />
        </Suspense>
      </div>
    </div>
  );
}
