interface TaskTypes {
  id: string;
  title: string;
  description: string;
  created_at: string;
}

import { createClient } from "@/lib/supabase/server";
import TaskActions from "./task-actions";

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
    view === "list" ? "flex flex-col gap-2" : "grid grid-cols-3 gap-4";

  return (
    <div className={containerClass}>
      {tasks.map((task: TaskTypes) => (
        <div key={task.id} className="rounded-lg border p-4 shadow-sm">
          <h3 className="font-semibold">{task.title}</h3>
          <p className="text-sm text-muted-foreground">{task.description}</p>
          <span className="text-xs text-gray-400">
            {new Date(task.created_at).toLocaleString()}
          </span>
          <div>
            <TaskActions
              id={task.id}
              title={task.title}
              description={task.description}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
