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
      <PanelTopClose
        onClick={toggleView}
        className={`${
          expanded ? "rotate-90" : "rotate-270"
        } transition-transform duration-500`}
        size={20}
      />
      <Link href={`/dashboard/tasks`}>
        <House size={20} />
      </Link>
      <Link href={`/dashboard/tasks/${id}`}>
        <StickyNote size={20} />
      </Link>
      <Link href={`/dashboard/tasks/${id}/edit`}>
        <Pencil size={20} />
      </Link>
      <Link href={`/dashboard/tasks/${id}/delete`}>
        <Trash size={20} />
      </Link>
      <Link href={`/dashboard/tasks/${id}/settings`}>
        <Bolt size={20} />
      </Link>
    </nav>
  );
}
