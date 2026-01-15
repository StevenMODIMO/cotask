"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Spinner } from "./ui/spinner";
import { Trash, AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function EditTask({
  id,
  title: initialTitle,
  description: initialDescription,
  status: initialStatus,
  priority: initialPriority,
}: {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
}) {
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialDescription);
    setStatus(initialStatus);
    setPriority(initialPriority);
  }, [initialTitle, initialDescription, initialStatus, initialPriority]);

  const deleteTask = async (id: string) => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      setIsLoading(false);
      console.log(error);
    }
    setIsLoading(false);
    console.log(data);
  };

  const updateTask = async (id: string) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    const { error } = await supabase
      .from("tasks")
      .update({
        title,
        description,
        status,
        priority,
      })
      .eq("id", id);

    if (error) {
      console.log(error.message);
      setError("Failed to update task");
    } else {
      setSuccess("Task updated successfully");
    }

    setLoading(false);
  };

  return (
    <div>
      <div>
        {!isloading ? (
          <Trash
            onClick={() => deleteTask(id)}
            size={20}
            className="text-red-500 cursor-pointer"
          />
        ) : (
          <Spinner />
        )}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateTask(id);
        }}
        onFocus={() => {
          setError(null);
          setSuccess(null);
        }}
      >
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
          <div>
            <Select
              value={status}
              onValueChange={(value) => setStatus(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Task status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Activate</SelectItem>
                <SelectItem value="paused">Pause</SelectItem>
                <SelectItem value="done">Done</SelectItem>
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
          <Alert variant="destructive" className="mt-2 dark:bg-[#262626]">
            <AlertCircleIcon />
            <AlertDescription className="font-medium lg:text-center">
              {error}
            </AlertDescription>
          </Alert>
        )}
        <Button
          className="bg-[#F59E0B] text-[#262626]  cursor-pointer hover:bg-[#F59E0B] dark:text-white"
          type="submit"
        >
          {!loading ? (
            <span>Update task</span>
          ) : (
            <span className="border-t-transparent border-3 h-5 w-5 rounded-full dark:border-white dark:border-t-transparent animate-spin"></span>
          )}
        </Button>
      </form>
    </div>
  );
}
