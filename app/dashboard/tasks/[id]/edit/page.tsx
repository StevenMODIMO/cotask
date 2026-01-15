import { createClient } from "@/lib/supabase/server";
import TaskActions from "@/components/task-actions";
import { notFound } from "next/navigation";

export default async function EditTask({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: task, error } = await supabase
    .from("tasks")
    .select()
    .eq("id", id)
    .single();

  if (error || !task) {
    notFound();
  }
  return (
    <div>
      <TaskActions
        id={task.id}
        title={task.title}
        description={task?.description}
        status={task.status}
        priority={task.priority}
      />
    </div>
  );
}
