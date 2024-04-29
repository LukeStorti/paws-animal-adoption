import { Button } from "@/components/ui/button";
import Link from "next/link";
import SubmitButtons from "./SubmitButtons";

const BottomBar = () => {
  return (
    <div className="fixed w-full bottom-0 z-10 bg-white border-t h-24">
      <div className="flex justify-between items-center mx-auto px-5 lg:px-10 h-full">
        <Button variant="outline" size="lg" asChild>
          <Link href="/">Cancel</Link>
        </Button>
        <SubmitButtons />
      </div>
    </div>
  );
};

export default BottomBar;
