import { updateProfile } from "@/app/actions";
import BottomBar from "@/app/components/BottomBar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const EditProfile = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <div className="w-3/5 mx-auto space-y-2 mt-10">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Edit your profile
        </h2>
      </div>

      <form action={updateProfile}>
        <input type="hidden" name="userId" value={params.id} />
        <div className="mx-auto w-3/5 mt-10 flex flex-col gap-y-5 mb-36">
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="title">Name</Label>
            <Input name="title" placeholder="Your Name" type="text" id="title" required />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              name="description"
              placeholder="Tell us about yourself..."
              id="description"
              required
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="photo">Image</Label>
            <Input name="photo" type="file" required id="photo" />
          </div>
        </div>
        <BottomBar />
      </form>
    </>
  );
};

export default EditProfile;
