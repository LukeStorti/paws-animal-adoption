import { createCategoryPage } from "@/app/actions";
import BottomBar from "@/app/components/BottomBar";
import SelectCategory from "@/app/components/SelectCategory";
import SubmitButtons from "@/app/components/SubmitButtons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StructureRoute = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <div className="w-3/5 mx-auto space-y-2">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">Woof or Meow?</h2>
        <p className="text-md font-normal tracking-tight text-muted-foreground">
          Select a category for your animal
        </p>
      </div>

      <form action={createCategoryPage}>
        <input type="hidden" name="petId" value={params.id} />
        <SelectCategory />
        <BottomBar />
      </form>
    </>
  );
};

export default StructureRoute;
