"use client";
import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";
import {
  Funnel,
  List,
  Grid2X2,
  Plus,
  AlertCircleIcon,
  CheckCircle2Icon,
} from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { Alert, AlertDescription } from "./ui/alert";
import { useRouter, useSearchParams } from "next/navigation";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [priority, setPriority] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  function setView(type: "list" | "grid") {
    // store in localStorage
    localStorage.setItem("tasks_view", type);

    // keep URL in sync
    const params = new URLSearchParams(searchParams);
    params.set("view", type);
    router.push(`?${params.toString()}`, { scroll: false });
  }

  useEffect(() => {
    const storedView = localStorage.getItem("tasks_view") as
      | "list"
      | "grid"
      | null;

    if (!storedView) return;

    const params = new URLSearchParams(searchParams);

    // avoid unnecessary router pushes
    if (params.get("view") !== storedView) {
      params.set("view", storedView);
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, []);

  // supabase initialization
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (!title || !description || !priority) {
        setError("Some task details are missing.");
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from("tasks")
        .insert({ title, description, priority })
        .select();

      if (error) {
        console.log(error);
      }
      console.log(data);

      setSuccess("Submitted successfully");
      setTitle("");
      setDescription("");
      await new Promise((res) => setTimeout(res, 500));
      setOpen(false);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-sm">
      <header className="flex flex-col gap-4 mt-3">
        <div className="lg:flex lg:justiy-between">
          <div className="flex items-center gap-2">
            <Dialog open={openSearch} onOpenChange={setOpenSearch}>
              <DialogTrigger>
                <Input
                  onFocus={() => setOpenSearch(true)}
                  placeholder="Search tasks"
                  className="dark:bg-[#1717173d] p-4 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                />
              </DialogTrigger>
              <DialogContent>
                {" "}
                <DialogHeader>
                  <DialogTitle>Search task</DialogTitle>
                  <DialogDescription>
                    Create a new task and later invite others to collaborate
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Funnel size={18} />
          </div>
          <div className="flex gap-2 items-center ml-auto w-fit">
            <div className="flex items-center gap-2">
              <List
                size={18}
                onClick={() => setView("list")}
                className="cursor-pointer"
              />
              <Grid2X2
                size={18}
                onClick={() => setView("grid")}
                className="cursor-pointer"
              />
            </div>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="cursor-pointer bg-yellow-500 text-[#262626] hover:bg-yellow-500 dark:text-white flex items-center">
                <Plus size={18} />
                <span>New task</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form
                onSubmit={handleSubmit}
                onFocus={() => {
                  setError(null);
                  setSuccess(null);
                }}
              >
                <DialogHeader>
                  <DialogTitle>Add new task</DialogTitle>
                  <DialogDescription>
                    Create a new task and later invite others to collaborate
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      id="title"
                      name="name"
                      placeholder="Marketing ad campaign"
                      className="p-4 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      id="description"
                      name="username"
                      placeholder="Promote new product on social media"
                      className="p-4 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                    />
                  </div>
                  <div>
                    <Select
                      value={priority}
                      onValueChange={(value) => setPriority(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Task priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {success && (
                  <Alert
                    variant="default"
                    className="mt-2 border-green-500 bg-green-50 dark:bg-[#262626] dark:text-green-500 text-green-900"
                  >
                    <CheckCircle2Icon />
                    <AlertDescription className="font-medium">
                      {success}
                    </AlertDescription>
                  </Alert>
                )}
                {error && (
                  <Alert
                    variant="destructive"
                    className="mt-2 dark:bg-[#262626]"
                  >
                    <AlertCircleIcon />
                    <AlertDescription className="font-medium lg:text-center">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}
                <DialogFooter className="mt-2">
                  <DialogClose asChild>
                    <Button
                      className="text-[#262626] cursor-pointer dark:text-white hover:bg-white"
                      variant="outline"
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    className="bg-yellow-500 text-[#262626]  cursor-pointer hover:bg-yellow-500 dark:text-white"
                    type="submit"
                  >
                    {!loading ? (
                      <span>Create task</span>
                    ) : (
                      <span className="border-t-transparent border-3 h-5 w-5 rounded-full dark:border-white dark:border-t-transparent animate-spin"></span>
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>
    </div>
  );
}
