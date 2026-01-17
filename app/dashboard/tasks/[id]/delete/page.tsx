import DeleteTask from "@/components/task-delete";

export default async function TaskDeletion({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="md:w-fit md:mx-auto">
      <DeleteTask id={id} />
    </div>
  );
}
