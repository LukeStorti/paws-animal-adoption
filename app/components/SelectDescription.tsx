"use client";
import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import React, { useState } from "react";

const SelectDescription = ({
  name,
  title,
  imageUrl,
}: {
  name: string;
  title: string;
  imageUrl: string;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<boolean>(false);
  const selectedCategoryValue = selectedCategory.toString();
  return (
    <>
      <input type="hidden" name={name} value={selectedCategoryValue} />
      <Card
        className={
          selectedCategory
            ? "border-primary border-2 w-[200px] h-[150px] cursor-pointer"
            : "border-2 w-[200px] h-[150px] cursor-pointer"
        }
        onClick={() => setSelectedCategory((prev) => !prev)}
      >
        <CardHeader className="flex flex-col items-center justify-center">
          <Image src={imageUrl} alt={name} height={56} width={56} className="w-14 h-14" />
          <h3 className="text-md text-center font-medium">{title}</h3>
        </CardHeader>
      </Card>
    </>
  );
};

export default SelectDescription;
