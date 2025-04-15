"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";

export default function Navbar() {
  const { data: session, status } = useSession();

  const user: User = session?.user as User;

  return (
    <nav className="p-4 md:p-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-foreground/90">
          True Feedback
        </Link>

        {session && user ? (
          <>
            <span className="mr-4 max-sm:mr-11 w-36">Welcome {user.username || user.email}</span>
            <Button onClick={() => signOut({ redirect: false })} className=" bg-slate-100 text-black" variant="outline">
              Logout
            </Button>
          </>
        ) : (
          <Link href="/sign-in">
            <Button size={"lg"}>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
