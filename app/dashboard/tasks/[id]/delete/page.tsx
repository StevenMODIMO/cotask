import DeleteTask from "@/components/task-delete";

export default async function TaskDeletion({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <DeleteTask id={id} />
    </div>
  );
}
