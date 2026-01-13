import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardAction,
  CardFooter,
  CardTitle,
} from "./ui/card";
import { Skeleton } from "./ui/skeleton";


export default function TaskSkeleton() {
  return (
    <div className="flex flex-col gap-3 my-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:w-full">
      <Card className="dark:bg-[#262626]">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-2 w-48 bg-gray-200 dark:bg-[#383737]" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-1 w-60 bg-gray-200 dark:bg-[#383737]" />
          </CardDescription>
          <CardAction>
            <Skeleton className="h-4 w-4 rounded bg-gray-200 dark:bg-[#383737]" />
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Skeleton className="h-2 w-10 bg-gray-200 dark:bg-[#383737]" />
            <Skeleton className="h-2 w-10 bg-gray-200 dark:bg-[#383737]" />
            <Skeleton className="h-2 w-10 bg-gray-200 dark:bg-[#383737]" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 items-start">
          <Skeleton className="h-2 w-24 bg-gray-200 dark:bg-[#383737]" />
          <Skeleton className="h-2 w-24 bg-gray-200 dark:bg-[#383737]" />
        </CardFooter>
      </Card>

      <Card className="dark:bg-[#262626]">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-2 w-48 bg-gray-200 dark:bg-[#383737]" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-1 w-60 bg-gray-200 dark:bg-[#383737]" />
          </CardDescription>
          <CardAction>
            <Skeleton className="h-4 w-4 rounded bg-gray-200 dark:bg-[#383737]" />
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Skeleton className="h-2 w-10 bg-gray-200 dark:bg-[#383737]" />
            <Skeleton className="h-2 w-10 bg-gray-200 dark:bg-[#383737]" />
            <Skeleton className="h-2 w-10 bg-gray-200 dark:bg-[#383737]" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 items-start">
          <Skeleton className="h-2 w-24 bg-gray-200 dark:bg-[#383737]" />
          <Skeleton className="h-2 w-24 bg-gray-200 dark:bg-[#383737]" />
        </CardFooter>
      </Card>
      <Card className="hidden md:flex dark:bg-[#262626]">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-2 w-48 bg-gray-200 dark:bg-[#383737]" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-1 w-60 bg-gray-200 dark:bg-[#383737]" />
          </CardDescription>
          <CardAction>
            <Skeleton className="h-4 w-4 rounded bg-gray-200 dark:bg-[#383737]" />
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Skeleton className="h-2 w-10 bg-gray-200 dark:bg-[#383737]" />
            <Skeleton className="h-2 w-10 bg-gray-200 dark:bg-[#383737]" />
            <Skeleton className="h-2 w-10 bg-gray-200 dark:bg-[#383737]" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 items-start">
          <Skeleton className="h-2 w-24 bg-gray-200 dark:bg-[#383737]" />
          <Skeleton className="h-2 w-24 bg-gray-200 dark:bg-[#383737]" />
        </CardFooter>
      </Card>
      <Card className="hidden lg:flex dark:bg-[#262626]">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-2 w-48 bg-gray-200 dark:bg-[#383737]" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-1 w-60 bg-gray-200 dark:bg-[#383737]" />
          </CardDescription>
          <CardAction>
            <Skeleton className="h-4 w-4 rounded bg-gray-200 dark:bg-[#383737]" />
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Skeleton className="h-2 w-10 bg-gray-200 dark:bg-[#383737]" />
            <Skeleton className="h-2 w-10 bg-gray-200 dark:bg-[#383737]" />
            <Skeleton className="h-2 w-10 bg-gray-200 dark:bg-[#383737]" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 items-start">
          <Skeleton className="h-2 w-24 bg-gray-200 dark:bg-[#383737]" />
          <Skeleton className="h-2 w-24 bg-gray-200 dark:bg-[#383737]" />
        </CardFooter>
      </Card>
      <Card className="hidden lg:flex dark:bg-[#262626]">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-2 w-48 bg-gray-200 dark:bg-[#383737]" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-1 w-60 bg-gray-200 dark:bg-[#383737]" />
          </CardDescription>
          <CardAction>
            <Skeleton className="h-4 w-4 rounded bg-gray-200 dark:bg-[#383737]" />
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Skeleton className="h-2 w-10 bg-gray-200 dark:bg-[#383737]" />
            <Skeleton className="h-2 w-10 bg-gray-200 dark:bg-[#383737]" />
            <Skeleton className="h-2 w-10 bg-gray-200 dark:bg-[#383737]" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 items-start">
          <Skeleton className="h-2 w-24 bg-gray-200 dark:bg-[#383737]" />
          <Skeleton className="h-2 w-24 bg-gray-200 dark:bg-[#383737]" />
        </CardFooter>
      </Card>
    </div>
  );
}
