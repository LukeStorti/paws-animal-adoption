"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { categoryItems } from "../lib/categoryItems";
import Image from "next/image";
import { useState } from "react";

const SelectCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 w-3/5 mx-auto mb-36">
      <input type="hidden" name="categoryName" value={selectedCategory as string} />
      {categoryItems.map((item) => (
        <div key={item.id} className="cursor-pointer">
          <Card
            className={selectedCategory === item.name ? "border-primary border-2" : "border-2"}
            onClick={() => setSelectedCategory(item.name)}
          >
            <CardHeader className="flex flex-col items-center justify-center">
              <Image
                src={item.imageUrl}
                alt={item.name}
                height={56}
                width={56}
                className="w-14 h-14"
              />
              <h3 className="text-xl font-medium">{item.title}</h3>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default SelectCategory;
