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
  // const supabase = await createClient();
  // const { data, error } = await supabase.from("tasks").select("*").eq("id", id);
  // if (error) {
  //   //  console.log(error);
  // } else {
  //   //    console.log(data[0]);
  // }
  return (
    <div className="lg:mx-0 lg:flex">
      <TaskHeader />
      <div className="w-[80%] pl-24">{children}</div>
    </div>
  );
}
