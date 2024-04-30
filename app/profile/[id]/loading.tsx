import { Skeleton } from "@/components/ui/skeleton";

const ProfileLoading = () => {
  return (
    <div className="container mx-auto mt-10">
      <div className="flex flex-col md:flex-row items-start justify-between gap-8">
        <Skeleton className="h-72 w-72 lg:h-[550px] lg:w-[550px]" />
        <div className="w-full flex flex-col mt-10">
          <Skeleton className="w-1/3 h-5 my-2" />
          <div className="flex flex-col gap-4 mt-2">
            <Skeleton className="w-1/4 h-5" />
            <Skeleton className="w-1/4 h-5" />
            <Skeleton className="w-1/4 h-5" />
          </div>
          <Skeleton className="w-full h-14 mt-4" />
        </div>
      </div>
    </div>
  );
};

export default ProfileLoading;
