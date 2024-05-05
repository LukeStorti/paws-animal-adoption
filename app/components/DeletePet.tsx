import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";

import { deletePetFromDb } from "../actions";

const DeletePet = ({ petId, pathName }: { petId: string; pathName: string }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <div className="bg-primary-foreground w-10 h-10 rounded-lg flex items-center justify-center">
            <Trash2 className="w-4 h-4" />
          </div>
        </DialogTrigger>
        <DialogContent>
          <form action={deletePetFromDb}>
            <input type="hidden" name="petId" value={petId} />
            <input type="hidden" name="pathName" value={pathName} />
            <DialogHeader>
              <DialogTitle>Are you sure you want to remove this pet?</DialogTitle>
              <DialogDescription>This action is permant</DialogDescription>
            </DialogHeader>

            <DialogClose asChild>
              <Button type="submit" size="lg">
                Delete
              </Button>
            </DialogClose>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeletePet;
