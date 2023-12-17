import { Card, Skeleton } from "@nextui-org/react";

export default function SkeletonCard() {
  return (
    <Card className="w-[220px] h-[400px] space-y-5 rounded-none bg-secondary">
      <Skeleton className="w-[100px] h-full sm:w-full sm:h-[65%] ">
        <div className="h-24  bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3 p-4">
        <Skeleton className="w-3/5">
          <div className="h-3 w-3/5 bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5">
          <div className="h-3 w-4/5 bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5">
          <div className="h-3 w-2/5 bg-default-300"></div>
        </Skeleton>
      </div>
    </Card>
  );
}
