import Link from "next/link";
import logo from "../../public/logo.jpg";
import Image from "next/image";
const Footer = () => {
  return (
    <footer className="w-full border-t h-20 mt-10">
      <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
        <Link href="/" className="flex space-x-4 items-center">
          <Image src={logo} alt="logo" className="w-4 h-4 md:w-8 md:h-8" priority />
        </Link>
        <p className="text-sm text-muted-foreground">Copyright Paws © 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
