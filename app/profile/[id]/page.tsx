import ListingCard from "@/app/components/ListingCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
async function getData(userId: string) {
  noStore();
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      profileImage: true,
      description: true,
      Pet: true,
      Favorite: true,
      email: true,
    },
  });
  return data;
}

async function getPets(userId: string) {
  const pets = await prisma.pet.findMany({
    where: {
      addedCateogry: true,
      addedDescription: true,
      addedLocation: true,
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

const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(params.id);
  const pets = await getPets(params.id);
  return (
    <div className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight transition-colors mb-10">
        Your profile
      </h2>
      <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
        <div className="relative h-72 w-72 lg:h-[550px] lg:w-[550px]">
          <Image
            alt="Image of pet"
            src={
              `https://cdmvyaomzbmsumofwkhj.supabase.co/storage/v1/object/public/images/${data?.profileImage}` ??
              user?.picture
            }
            className="rounded-lg h-full object-cover w-full"
            width={288}
            height={288}
            priority={true}
          />
        </div>
        <div className="flex flex-col mt-8 w-full md:w-3/4  px-2">
          <h1 className="text-3xl font-medium mb-5">{data?.firstName}</h1>
          <p className="text-md tracking-tight mt-5 ">{data?.description}</p>
          <p className="text-md tracking-tight mt-5 ">Contact: {data?.email}</p>
          {user?.id === params.id && (
            <Link href={`/profile/${params.id}/edit`} className="my-8">
              <Button>Edit your profile</Button>
            </Link>
          )}
        </div>
      </div>
      <Separator className="my-8" />
      <h3 className="text-3xl font-semibold tracking-tight transition-colors mb-10 mt-10">
        Your Pets
      </h3>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8 mb-8">
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
    </div>
  );
};

export default ProfilePage;
