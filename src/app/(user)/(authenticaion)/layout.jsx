"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

const Page = ({ children }) => {
  const pathname = usePathname();


  return (
    <div className="flex h-full">
      <div className="md:w-[50%] bg-primary" />
      <div className="bg-black grow p-7">
        <div className="mb-8 text-custom-light-gray text-center md:text-start">
          {pathname.includes("sign-in") ? (
            <span className="text-white text-3xl underline underline-offset-8 ">Sign In</span>
          ) : (
            <Link href={"/sign-in"} className="text-2xl">
              Sign In
            </Link>
          )}
          {" or "}
          {pathname.includes("sign-up") ? (
            <span className="text-white text-3xl underline underline-offset-8">Sign Up</span>
          ) : (
            <Link href={"/sign-up"} className="text-2xl">
              Sign Up
            </Link>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export default Page;
