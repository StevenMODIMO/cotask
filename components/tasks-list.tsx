interface TaskTypes {
  id: string;
  title: string;
  description: string;
  created_at: string;
}

import { createClient } from "@/lib/supabase/server";

export default async function TasksLists() {
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

  return (
    <div className="space-y-4">
      {tasks.map((task: TaskTypes) => (
        <div key={task.id} className="rounded-lg border p-4 shadow-sm">
          <h3 className="font-semibold">{task.title}</h3>
          <p className="text-sm text-muted-foreground">{task.description}</p>
          <span className="text-xs text-gray-400">
            {new Date(task.created_at).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}
