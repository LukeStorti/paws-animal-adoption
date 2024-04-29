import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { createPet } from "../actions";
import prisma from "@/lib/db";

const UserNav = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const currentUser = await prisma.user.findFirst({
    where: {
      id: user?.id as string,
    },
  });

  const createPetWithId = createPet.bind(null, {
    userId: user?.id as string,
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-4 flex items-center gap-x-4">
          <MenuIcon className="w-6 h-6" />
          <Avatar className="hidden lg:block">
            <AvatarImage src={user?.picture ?? "https://github.com/shadcn.png"} />
            <AvatarFallback>PW</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {user ? (
          <>
            {currentUser?.isNPO ? (
              <>
                <DropdownMenuItem>
                  <form className="w-full" action={createPetWithId}>
                    <button type="submit" className="w-full text-start">
                      Add new Pet
                    </button>
                  </form>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/my-pets" className="w-full">
                    My Pets
                  </Link>
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem>
                  <Link href={`/create/${user?.id}/register`} className="w-full">
                    Register as NPO
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/favorites" className="w-full">
                    Favorites
                  </Link>
                </DropdownMenuItem>
              </>
            )}

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogoutLink className="w-full">Logout</LogoutLink>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <RegisterLink className="w-full">Register</RegisterLink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LoginLink className="w-full">Login</LoginLink>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
