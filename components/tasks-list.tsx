interface TaskTypes {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  created_at: string;
}

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import TaskActions from "./task-actions";
import { Badge } from "./ui/badge";
import {
  ChevronRight,
  PlayCircle,
  PauseCircle,
  CheckCircle,
} from "./task-icons";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardFooter,
  CardContent,
} from "./ui/card";

type ViewMode = "grid" | "list";

export default async function TasksLists({
  view = "grid",
}: {
  view?: ViewMode;
}) {
  const supabase = await createClient();

  const { data: tasks, error } = await supabase
    .from("tasks")
    .select()
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="text-red-500">Failed to load tasks</div>;
  }

  if (!tasks || tasks.length === 0) {
    return <div>No tasks found</div>;
  }

  const containerClass =
    view === "list" ? "flex flex-col gap-4" : "flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={containerClass}>
      {tasks.map((task: TaskTypes) => (
        <Card key={task.id} className="dark:bg-[#1717173d] hover:bg-gray-50 dark:hover:bg-[#17171700] cursor-pointer">
          <CardHeader>
            <CardTitle>{task.title}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              ID: <span>{task.id.slice(0, 12)}...</span>
            </CardDescription>
            <CardAction>
              <Link href={`/dashboard/tasks/${task.id}`}>
                <ChevronRight />
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <div>
              {task.status === "active" ? (
                <PlayCircle />
              ) : task.status === "paused" ? (
                <PauseCircle />
              ) : task.status === "done" ? (
                <CheckCircle />
              ) : null}
            </div>
            <div>
              {task.priority === "high" ? (
                <Badge variant="destructive">High</Badge>
              ) : task.priority === "medium" ? (
                <Badge className="bg-yellow-500">Medium</Badge>
              ) : task.priority === "low" ? (
                <Badge className="bg-green-300">Low</Badge>
              ) : null}
            </div>
          </CardContent>
          <CardFooter>
            <span className="text-xs text-gray-400">
              {new Date(task.created_at).toLocaleString()}
            </span>
          </CardFooter>
        </Card>
      ))}

      {/* {tasks.map((task: TaskTypes) => (
        <div key={task.id} className="rounded-lg border p-4 shadow-sm">
          <h3 className="font-semibold">{task.title}</h3>
          <p className="text-sm text-muted-foreground">{task.description}</p>
          <span className="text-xs text-gray-400">
            {new Date(task.created_at).toLocaleString()}
          </span>
          <span className="text-xs text-gray-400">
            Priority: {task.priority}
          </span>
          <span className="text-xs text-gray-400">Status: {task.status}</span>
          <div>
            <TaskActions
              id={task.id}
              title={task.title}
              description={task.description}
              priority={task.priority}
              status={task.status}
            />
          </div>
        </div>
      ))} */}
    </div>
  );
}
