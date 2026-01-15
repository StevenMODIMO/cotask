"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

import {
  Trash2,
  AlertTriangle,
  Users,
  BellOff,
  History,
  Link2Off,
  ShieldAlert,
  Loader2,
} from "lucide-react";

export default function DeleteTask({ id }: { id: string }) {
  const supabase = createClient();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      setError("Failed to delete task. Please try again.");
      setLoading(false);
      return;
    }

    // redirect after successful delete
    router.push("/dashboard/tasks");
    router.refresh();
  };

  return (
    <Card className="border-red-500/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-600">
          <AlertTriangle size={20} />
          Delete Task
        </CardTitle>
        <CardDescription>
          This action is permanent and cannot be undone.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Alert variant="destructive">
          <AlertTriangle />
          <AlertDescription className="font-medium">
            Deleting this task will cause the following effects:
          </AlertDescription>
        </Alert>

        <ul className="space-y-3 text-sm">
          <li className="flex gap-2 items-start">
            <Users size={16} className="text-muted-foreground mt-0.5" />
            All teams associated with this task will be muted
          </li>

          <li className="flex gap-2 items-start">
            <BellOff size={16} className="text-muted-foreground mt-0.5" />
            Notifications related to this task will stop immediately
          </li>

          <li className="flex gap-2 items-start">
            <History size={16} className="text-muted-foreground mt-0.5" />
            Task activity history will be permanently removed
          </li>

          <li className="flex gap-2 items-start">
            <Link2Off size={16} className="text-muted-foreground mt-0.5" />
            Any links or references to this task will break
          </li>

          <li className="flex gap-2 items-start">
            <ShieldAlert size={16} className="text-muted-foreground mt-0.5" />
            This action cannot be reversed by administrators
          </li>
        </ul>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button variant="destructive" onClick={handleDelete} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2" size={16} />
              Deleting…
            </>
          ) : (
            <>
              <Trash2 className="mr-2" size={16} />
              Delete Task
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
