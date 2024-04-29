"use client";
import { createLocation } from "@/app/actions";
import BottomBar from "@/app/components/BottomBar";
import { provinces } from "@/app/lib/provinceData";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const AddressRoute = ({ params }: { params: { id: string } }) => {
  const [location, setLocation] = useState("");
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-medium tracking-tight transition-colors mb-10">
          Where is Your Furry Friend?
        </h2>
      </div>

      <form action={createLocation}>
        <input type="hidden" value={location} name="location" />
        <input type="hidden" name="petId" value={params.id} />
        <div className="w-3/5 mx-auto mb-36">
          <div className="mb-5">
            <Select required onValueChange={(value) => setLocation(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Province</SelectLabel>
                  {provinces.map((item) => (
                    <SelectItem key={item.name} value={item.fullName}>
                      {item.fullName}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <BottomBar />
      </form>
    </>
  );
};

export default AddressRoute;
