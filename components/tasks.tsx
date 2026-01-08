"use client";
import { Funnel, List, Grid2X2, Plus } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function TasksLists() {
  return (
    <div className="text-sm">
      <header className="flex flex-col gap-4 mt-3">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search tasks"
            className="p-4 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
          />
          <Funnel size={18} />
        </div>
        <div className="flex items-center gap-2 w-fit ml-auto">
          <List size={18} />
          <Grid2X2 size={18} />
          <Button className="bg-[#F59E0B] text-[#262626] hover:bg-[#F59E0B] dark:text-white">
            <Plus size={18} />
            <span>New task</span>
          </Button>
        </div>
      </header>
    </div>
  );
}
