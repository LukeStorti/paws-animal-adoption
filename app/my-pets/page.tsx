import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import NoPets from "../components/NoPets";
import ListingCard from "../components/ListingCard";
import { unstable_noStore as noStore } from "next/cache";
async function getData(userId: string) {
  noStore();
  const data = await prisma.pet.findMany({
    where: {
      userId: userId,
      addedCateogry: true,
      addedDescription: true,
      addedLocation: true,
    },
    select: {
      photo: true,
      id: true,
      title: true,
      breed: true,
      location: true,
      age: true,
      Favorite: {
        where: {
          userId: userId,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

const MyPets = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/");
  }
  const data = await getData(user.id);
  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight transition-colors">Your Pets</h2>

      {data.length === 0 ? (
        <NoPets
          title="You have no active listings..."
          descrtiption="Please create a listing to view them here"
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {data.map((item) => (
            <ListingCard
              key={item.id}
              image={item.photo as string}
              petId={item.id as string}
              age={item.age as number}
              breed={item.breed as string}
              location={item.location as string}
              title={item.title as string}
              pathName="/my-pets"
              userId={user.id}
              favoriteId={item.Favorite[0]?.id as string}
              isInFavoriteList={(item.Favorite.length as number) > 0 ? true : false}
              deletePet={true}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default MyPets;
