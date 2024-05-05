import Image from "next/image";
import Link from "next/link";
import AddToFavorite from "./AddToFavorite";
import { addToFavorite, deleteFromFavorite, deletePetFromDb } from "../actions";
import DeleteFromFavorite from "./DeleteFromFavorite";
import DeletePet from "./DeletePet";

interface ListingCardProps {
  image: string;
  title: string;
  breed: string;
  age: number;
  location: string;
  userId: string | undefined;
  isInFavoriteList: boolean;
  favoriteId: string;
  petId: string;
  pathName: string;
  deletePet: boolean;
}

const ListingCard = ({
  breed,
  image,
  title,
  age,
  location,
  userId,
  isInFavoriteList,
  favoriteId,
  petId,
  pathName,
  deletePet,
}: ListingCardProps) => {
  return (
    <div className="flex flex-col">
      <div className="relative h-72 ">
        <Image
          src={`https://cdmvyaomzbmsumofwkhj.supabase.co/storage/v1/object/public/images/${image}`}
          alt="image on animal"
          fill
          className="rounded-lg h-full object-cover mb-3"
        />
        {userId && (
          <div className="z-10 absolute top-2 right-2">
            {isInFavoriteList ? (
              <form action={deleteFromFavorite}>
                <input type="hidden" name="favoriteId" value={favoriteId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
                <DeleteFromFavorite />
              </form>
            ) : (
              <form action={addToFavorite}>
                <input type="hidden" name="petId" value={petId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
                <AddToFavorite />
              </form>
            )}
          </div>
        )}

        {deletePet && (
          <div className="z-20 absolute top-2 left-2">
            <DeletePet petId={petId} pathName={pathName} />
          </div>
        )}
      </div>

      <Link href={`/pet/${petId}`} className="mt-2">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-base">{title}</h3>
          <p className="text-muted-foreground text-sm">
            {age > 0 ? age : ""} {age <= 0 ? "< 1" : ""} {age > 1 ? "years old" : "year old"}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground text-sm">{breed}</p>
          <p className="text-muted-foreground text-sm">{location}</p>
        </div>
      </Link>
    </div>
  );
};

export default ListingCard;
