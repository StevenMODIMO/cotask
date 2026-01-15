import React from "react";
//import { createClient } from "@/lib/supabase/server";
import { createStaticClient } from "@/lib/supabase/static";
import TaskHeader from "../components/header";

export async function generateStaticParams() {
  const supabase = createStaticClient();

  const { data, error } = await supabase.from("tasks").select("id");

  if (error || !data) {
    return [];
  }

  return data.map((task) => ({
    id: task.id,
  }));
}

export default async function TaskDashboard({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="flex gap-2 pt-2">
      <TaskHeader id={id} />
      <div className="">{children}</div>
    </div>
  );
}
