import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.jpg";
import UserNav from "./UserNav";
const Navbar = () => {
  return (
    <nav className="w-full border-b">
      <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
        <Link href="/" className="flex space-x-4 items-center">
          <Image src={logo} alt="logo" className="w-10 h-10 md:w-20 md:h-20" priority />
          <h1 className="text-2xl tracking-tight hidden md:block">Paws</h1>
        </Link>
        <UserNav />
      </div>
    </nav>
  );
};

export default Navbar;
