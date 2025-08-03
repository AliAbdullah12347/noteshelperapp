import Link from "next/link";
import { shadow } from "@/app/styles/utils";
import { Button } from "@/components/ui/button";
import DarkModeToggle from "@/components/DarkModeToggle";
import LogOutButton from "@/components/LogOutButton";
import { getUser } from "@/auth/server";

async function Header() {
    const user = await getUser(); // Replace with actual user state if needed
  return (
    <header className="relative flex h-24 w-full items-center justify-between bg-popover"
    style={{
        boxShadow: shadow
     }}>
        <Link className = "flex items-end gap-2" href = "/"> 
        <img src="/noteshelperlogo.png" height={60} width={60} className="rounded-full" /> 
        <h1 className="flex flex-col pb-1 text-2xl font-semibold leading-6"> 
            NotesHelper <span> App</span>
        </h1>
        </Link>

        <div className="flex gap-4">
        {user ? (
            <LogOutButton />
        ) : 
        (
        <>
            <Button asChild>
            <Link href="/Sign-up" className="hidden sm:block">Sign Up</Link>
            </Button>

            <Button asChild variant={"outline"}>
            <Link href="/login">Login</Link>
            </Button>

        </>
        )
        }
        <DarkModeToggle />
        </div>
    </header>
  );
}

export default Header;