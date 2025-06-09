"use client";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <header className="navbar">
      <nav>
        <Link href={"/"}>
          <Image
            src={"/assets/icons/logo.svg"}
            width={32}
            height={32}
            alt="logo"
          />
          <h1>SnapCast</h1>
        </Link>
        {user && (
          <figure>
            <button onClick={() => router.push(`/profile/${user?.id}`)}>
              <Image
                src={user?.image || "/assets/images/dummy.jpg"}
                alt="user"
                width={36}
                height={36}
                className="rounded-full aspect-square"
              />
            </button>
            <button
              className="cursor-pointer"
              onClick={async () => {
                return await authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      redirect("/sign-in");
                    },
                  },
                });
              }}
            >
              <Image
                src={"/assets/icons/logout.svg"}
                width={24}
                height={24}
                className="rotate-180"
                alt="logout"
              />
            </button>
          </figure>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
