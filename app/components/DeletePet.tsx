"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";

const DeletePet = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button variant="outline" size="icon" disabled className="bg-primary-foreground">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        </Button>
      ) : (
        <Dialog>
          <DialogTrigger>
            <div className="bg-primary-foreground w-10 h-10 rounded-lg flex items-center justify-center">
              <Trash2 className="w-4 h-4" />
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure you want to remove this pet?</DialogTitle>
              <DialogDescription>This action is permant</DialogDescription>
            </DialogHeader>
            <Button variant="default" type="submit">
              Confirm
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default DeletePet;
