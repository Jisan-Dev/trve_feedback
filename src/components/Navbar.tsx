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
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link href="/" className="text-xl font-bold mb-4 md:mb-0 text-foreground/90">
          Mystery Message
        </Link>

        {session && user ? (
          <>
            <span className="mr-4">Welcome {user.username || user.email}</span>
            <Button onClick={() => signOut({ redirect: false })} className="w-full md:w-auto bg-slate-100 text-black" variant="outline">
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
