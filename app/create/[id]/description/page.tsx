import { createDescription } from "@/app/actions";
import BottomBar from "@/app/components/BottomBar";
import SelectDescription from "@/app/components/SelectDescription";
import { descriptionItems } from "@/app/lib/categoryItems";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const DescriptionRoute = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <div className="w-3/5 mx-auto space-y-2">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Paint a Picture of Your Pal!
        </h2>
        <p className="text-muted-foreground tracking-tight transition-colors">
          Give us all the details! From fluffy fur to quirky habits, let's make sure your pet steals
          hearts.
        </p>
      </div>

      <form action={createDescription}>
        <input type="hidden" name="petId" value={params.id} />
        <div className="mx-auto w-3/5 mt-10 flex flex-col gap-y-5 mb-36">
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="title">Name</Label>
            <Input name="title" required placeholder="Whos a good boy..." type="text" id="title" />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="breed">Breed</Label>
            <Input name="breed" required placeholder="If you know..." type="text" id="breed" />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              required
              placeholder="Tell us about your furry friend! From their favorite treats to their unique personality quirks, share all the details here."
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              name="age"
              required
              placeholder="In years, leave as 0 if less than 1"
              type="number"
              min={0}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="photo">Image</Label>
            <Input name="photo" type="file" required id="photo" />
          </div>
          <div className="flex flex-col md:flex-row md:justify-around w-full items-center mx-auto mt-4">
            {descriptionItems.map((item) => (
              <SelectDescription
                key={item.id}
                title={item.title}
                name={item.name}
                imageUrl={item.imageUrl}
              />
            ))}
          </div>
        </div>
        <BottomBar />
      </form>
    </>
  );
};

export default DescriptionRoute;
