import { registerNPO } from "@/app/actions";
import BottomBar from "@/app/components/BottomBar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RegisterNPORoute = ({ params }: { params: { id: string } }) => {
  const registerNPOwithId = registerNPO.bind(null, {
    userId: params.id as string,
  });

  return (
    <>
      <div className="w-3/5 mx-auto space-y-2 mt-10">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Join Us to Help Pets Find Their Forever Homes
        </h2>
        <p className="text-muted-foreground tracking-tight transition-colors">
          Register your Non-Profit Organization to start listing pets for adoption and connect them
          with loving families.
        </p>
        <p className="text-muted-foreground tracking-tight transition-colors">
          Email{" "}
          <a href="mailto:lukestorti@gmail.com" className="text-primary">
            lukestorti@gmail.com
          </a>{" "}
          with your NPO Registration number.
        </p>
        <p className="text-muted-foreground tracking-tight transition-colors">
          Once your NPO Registration has been validated, you will be able to post listings.
        </p>
      </div>

      {/* <form action={registerNPOwithId}>
        <input type="hidden" name="NPOno" id="NPOno" />
        <div className="mx-auto w-3/5 mt-10 flex flex-col gap-y-5 mb-36">
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="NPO">NPO Registration No.</Label>
            <Input
              name="title"
              required
              placeholder="Enter your NPO registration number"
              type="text"
              id="NPO"
            />
          </div>
        </div>
        <BottomBar />
      </form> */}
    </>
  );
};

export default RegisterNPORoute;
