import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import NoPets from "../components/NoPets";
import ListingCard from "../components/ListingCard";
import { unstable_noStore as noStore } from "next/cache";
async function getData(userId: string) {
  noStore();
  const data = await prisma.favorite.findMany({
    where: {
      userId: userId,
    },
    select: {
      Pet: {
        select: {
          photo: true,
          id: true,
          Favorite: true,
          title: true,
          breed: true,
          location: true,
          age: true,
        },
      },
    },
  });

  return data;
}

const FavoriteRoute = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/");
  }
  const pets = await getData(user.id);

  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight transition-colors">Your Favorites</h2>
      {pets.length === 0 ? (
        <NoPets title="No favorites!" descrtiption="Please add favorites to view them here..." />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {pets.map((item) => (
            <ListingCard
              key={item.Pet?.id}
              age={item.Pet?.age as number}
              breed={item.Pet?.breed as string}
              image={item.Pet?.photo as string}
              location={item.Pet?.location as string}
              title={item.Pet?.title as string}
              petId={item.Pet?.id as string}
              pathName="/favorites"
              userId={user.id}
              favoriteId={item.Pet?.Favorite[0].id as string}
              isInFavoriteList={(item.Pet?.Favorite.length as number) > 0 ? true : false}
              deletePet={false}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default FavoriteRoute;
