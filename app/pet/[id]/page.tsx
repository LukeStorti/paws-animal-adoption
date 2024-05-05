import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
async function getData(petId: string) {
  noStore();
  const data = await prisma.pet.findUnique({
    where: {
      id: petId,
    },
    select: {
      title: true,
      description: true,
      breed: true,
      age: true,
      photo: true,
      location: true,
      goodWithOtherAnimals: true,
      goodWithFamily: true,
      needsSpace: true,
      User: {
        select: {
          profileImage: true,
          firstName: true,
          id: true,
        },
      },
    },
  });
  return data;
}

const PetRoute = async ({ params }: { params: { id: string } }) => {
  const data = await getData(params.id);
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <div className="container mx-auto mt-10">
      <div className="flex flex-col md:flex-row items-start justify-between gap-8">
        <div className="relative h-72 w-72 lg:h-[550px] lg:w-[550px]">
          <Image
            alt="Image of pet"
            src={`https://cdmvyaomzbmsumofwkhj.supabase.co/storage/v1/object/public/images/${data?.photo}`}
            className="rounded-lg h-full object-cover w-full"
            width={288}
            height={288}
            priority={true}
          />
        </div>
        <div className="flex flex-col mt-8 w-full md:w-3/4  px-2">
          <h1 className="text-3xl font-medium mb-5">{data?.title}</h1>
          <h3 className="text-muted-foreground">{data?.breed}</h3>
          <p className="text-muted-foreground">
            {data?.age! > 0 ? data?.age : ""} {data?.age! <= 0 ? "< 1" : ""}{" "}
            {data?.age! > 1 ? "years old" : "year old"}
          </p>
          <p className="text-muted-foreground">{data?.location}</p>
          <p className="text-md tracking-tight mt-5 ">{data?.description}</p>
          <div className="flex flex-col md:flex-row w-full gap-4 mt-5 items-center">
            {data?.goodWithFamily && (
              <Card className="border-2 w-[200px] h-[150px] ">
                <CardHeader className="flex flex-col items-center justify-center">
                  <Image
                    src="/images/goodWithFamily.png"
                    alt="good with family card"
                    height={56}
                    width={56}
                    className="w-14 h-14"
                  />
                  <h3 className="text-md text-center font-medium">Good with Family</h3>
                </CardHeader>
              </Card>
            )}
            {data?.goodWithOtherAnimals && (
              <Card className="border-2 w-[200px] h-[150px] ">
                <CardHeader className="flex flex-col items-center justify-center">
                  <Image
                    src="/images/goodWithOtherAnimals.png"
                    alt="good with family card"
                    height={56}
                    width={56}
                    className="w-14 h-14"
                  />
                  <h3 className="text-md text-center font-medium">Good with other Animals</h3>
                </CardHeader>
              </Card>
            )}
            {data?.needsSpace && (
              <Card className="border-2 w-[200px] h-[150px] ">
                <CardHeader className="flex flex-col items-center justify-center">
                  <Image
                    src="/images/needsSpace.png"
                    alt="good with family card"
                    height={56}
                    width={56}
                    className="w-14 h-14"
                  />
                  <h3 className="text-md text-center font-medium">Needs Space</h3>
                </CardHeader>
              </Card>
            )}
          </div>
          <div className="mt-5 w-full md:w-2/3 ">
            <Button className="text-xl mt-10 p-2 w-full">Adopt Me</Button>
          </div>
        </div>
      </div>
      <Separator className="my-6" />
      <div className="flex items-center mt-10">
        <Link href={`/profile/${data?.User?.id}`} className="flex items-center space-x-2">
          <Avatar className="hidden lg:block">
            <AvatarImage
              src={
                user?.picture ??
                `https://cdmvyaomzbmsumofwkhj.supabase.co/storage/v1/object/public/images/${data?.User?.profileImage}`
              }
            />
            <AvatarFallback>PW</AvatarFallback>
          </Avatar>

          <h3 className="ml-2 text-muted-foreground font-medium">
            Listed by {data?.User?.firstName}
          </h3>
        </Link>
      </div>
    </div>
  );
};

export default PetRoute;
