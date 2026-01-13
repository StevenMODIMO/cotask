import React from "react";
import { createClient } from "@/lib/supabase/server";
import { createStaticClient } from "@/lib/supabase/static";

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
  const supabase = await createClient();
  const { data, error } = await supabase.from("tasks").select("*").eq("id", id);
  if (error) {
    //  console.log(error);
  } else {
    //    console.log(data[0]);
  }
  return (
    <div className="lg:w-full lg:mx-0">
      <nav>
        <h1>Task with id: {id}</h1>
      </nav>
      <div>{children}</div>
    </div>
  );
}
