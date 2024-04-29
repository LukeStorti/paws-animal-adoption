"use client";
import Link from "next/link";
import { categoryItems } from "../lib/categoryItems";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { cn } from "@/lib/utils";

const Filter = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("filter");
  const pathName = usePathname();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  return (
    <div className="flex items-center gap-x-12 w-full mt-5 justify-center">
      {categoryItems.map((item) => (
        <Link
          href={pathName + "?" + createQueryString("filter", item.name)}
          key={item.id}
          className={cn(
            search === item.name
              ? "border-b-2 border-black flex-shrink-0 p-3"
              : "opacity-30 flex-shrink-0 p-3",
            "flex flex-col gap-y-3 items-center "
          )}
        >
          <div className="relative w-16 h-16">
            <Image
              src={item.imageUrl}
              alt="category name"
              className="w-16 h-16"
              width={64}
              height={64}
            />
          </div>
          <p className="font-medium">{item.title}</p>
        </Link>
      ))}
    </div>
  );
};

export default Filter;
