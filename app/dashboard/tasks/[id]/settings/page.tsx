import { createClient } from "@/lib/supabase/server";

export default async function TaskSettings({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();
  const { data, error } = await supabase.from("tasks").select().eq("id", id);

  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
  return <div>Settings: {id}</div>;
}
