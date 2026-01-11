"use client";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
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

import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // supabase initialization
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (!title || !description) {
        setError("All fields must be filled");
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from("tasks")
        .insert({ title, description })
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
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search tasks"
            className="p-4 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
          />
          <Funnel size={18} />
        </div>
        <div className="flex gap-2 items-center ml-auto w-fit">
          <div className="flex items-center gap-2">
            <List size={18} />
            <Grid2X2 size={18} />
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="cursor-pointer bg-[#F59E0B] text-[#262626] hover:bg-[#F59E0B] dark:text-white flex items-center">
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
                    className="bg-[#F59E0B] text-[#262626]  cursor-pointer hover:bg-[#F59E0B] dark:text-white"
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
      {/* <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button></Button>
          </DialogTrigger>
        </form>
      </Dialog> */}
    </div>
  );
}
