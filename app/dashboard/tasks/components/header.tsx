"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  PanelTopClose,
  StickyNote,
  House,
  Pencil,
  Trash,
  Bolt,
} from "lucide-react";

export default function TaskHeader({ id }: { id: string }) {
  const [expanded, setExpanded] = useState<boolean>(true);

  useEffect(() => {
    const stored = localStorage.getItem("expanded");

    if (stored !== null) {
      setExpanded(JSON.parse(stored));
    } else {
      localStorage.setItem("expanded", JSON.stringify(true));
    }
  }, []);

  const toggleView = () => {
    setExpanded((prev) => {
      const next = !prev;
      localStorage.setItem("expanded", JSON.stringify(next));
      return next;
    });
  };

  return (
    <nav className="border-r-2 h-screen flex flex-col gap-6 px-2">
      <div onClick={toggleView} className="hidden md:flex items-center gap-2">
        <PanelTopClose
          className={`${
            !expanded ? "rotate-90" : "rotate-270"
          } transition-transform duration-500`}
          size={20}
        />
        {expanded && <span>Collapse</span>}
      </div>
      <Link href={`/dashboard/tasks`} className="flex items-center gap-2">
        <House size={20} />
        <span className={`hidden ${expanded ? "md:block" : "hidden"}`}>
          Back to tasks
        </span>
      </Link>
      <Link href={`/dashboard/tasks/${id}`} className="flex items-center gap-2">
        <StickyNote size={20} />
        <span className={`hidden ${expanded ? "md:block" : "hidden"}`}>Overview</span>
      </Link>
      <Link
        href={`/dashboard/tasks/${id}/edit`}
        className="flex items-center gap-2"
      >
        <Pencil size={20} />
        <span className={`hidden ${expanded ? "md:block" : "hidden"}`}>Update task</span>
      </Link>
      <Link
        href={`/dashboard/tasks/${id}/delete`}
        className="flex items-center gap-2"
      >
        <Trash size={20} />
        <span className={`hidden ${expanded ? "md:block" : "hidden"}`}>Delete task</span>
      </Link>
      <Link
        href={`/dashboard/tasks/${id}/settings`}
        className="flex items-center gap-2"
      >
        <Bolt size={20} />
        <span className={`hidden ${expanded ? "md:block" : "hidden"}`}>Settings</span>
      </Link>
    </nav>
  );
}
