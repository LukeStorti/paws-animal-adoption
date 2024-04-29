import Filter from "./components/Filter";
import prisma from "@/lib/db";
import ListingCard from "./components/ListingCard";
import { Suspense } from "react";
import SkeletonCard from "./components/SkeletonCard";
import NoPets from "./components/NoPets";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

async function getPets({
  searchParams,
  userId,
}: {
  userId: string | undefined;
  searchParams?: { filter?: string };
}) {
  const pets = await prisma.pet.findMany({
    where: {
      addedCateogry: true,
      addedDescription: true,
      addedLocation: true,
      categoryName: searchParams?.filter ?? undefined,
    },
    select: {
      photo: true,
      id: true,
      title: true,
      breed: true,
      age: true,
      location: true,
      Favorite: {
        where: {
          userId: userId ?? undefined,
        },
      },
    },
  });
  return pets;
}

export default function Home({ searchParams }: { searchParams?: { filter?: string } }) {
  return (
    <div className="container mx-auto px-5 lg:px-10 py-4">
      <Filter />
      <Suspense key={searchParams?.filter} fallback={<SkeletonLoading />}>
        <ShowPets searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function ShowPets({ searchParams }: { searchParams?: { filter?: string } }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const pets = await getPets({ searchParams: searchParams, userId: user?.id });

  return (
    <>
      {pets.length === 0 ? (
        <NoPets title="Sorry! No pets found for this category" />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {pets.map((item) => (
            <ListingCard
              key={item.id}
              image={item.photo as string}
              title={item.title as string}
              breed={item.breed as string}
              age={item.age as number}
              location={item.location as string}
              userId={user?.id}
              favoriteId={item.Favorite[0]?.id}
              isInFavoriteList={item.Favorite.length > 0 ? true : false}
              petId={item.id}
              pathName="/"
              deletePet={false}
            />
          ))}
        </div>
      )}
    </>
  );
}

const SkeletonLoading = () => {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
};
