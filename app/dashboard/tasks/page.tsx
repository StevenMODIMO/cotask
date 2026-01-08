import React from "react";
import TasksLists from "@/components/tasks";

export default function Tasks() {
  return (
    <div className="pt-6">
      <header className="text-2xl font-medium">
        <h1>Tasks</h1>
      </header>
      <div>
        <TasksLists />
      </div>
    </div>
  );
}
