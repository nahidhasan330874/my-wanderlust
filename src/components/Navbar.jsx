"use client";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
 

  const handleLogout = async() =>{
    await authClient.signOut();
  }

  return (
    <nav className="flex items-center justify-between p-5 bg-white text-black shadow-md z-10 top-0 sticky">
      <ul className="flex gap-8">
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/destinations"}>Destinations</Link>
        </li>
        <li>
          <Link href={"/my-bookings"}>My Bookings</Link>
        </li>
        <li>
          <Link href={"/add-destination"}>Add Destination</Link>
        </li>
      </ul>

      <div>
        <Image
          src={"/assets/Wanderlast.png"}
          alt="wanderlast-png"
          height={150}
          width={150}
        />
      </div>
      <ul className="flex items-center gap-4">
        <li>
          <Link href={"/profile"}>Profile</Link>
        </li>
        {user ? (
          <>
            <li>
              <Avatar>
                <Avatar.Image referrerPolicy="no-referrer" alt="John Doe" src={user?.image} />
                <Avatar.Fallback>{user.name.charAt()}</Avatar.Fallback>
              </Avatar>
            </li>

            <li>
              <Button onClick={handleLogout} variant="danger">Logout</Button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href={"/login"}>Login</Link>
            </li>
            <li>
              <Link href={"/signup"}>Sing Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
