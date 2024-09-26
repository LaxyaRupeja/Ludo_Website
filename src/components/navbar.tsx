import { Dices } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"
import { UserButton } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"


export const Navbar = async () => {

    const user = await currentUser();



    return <nav className="flex max-h-[69px] min-h-[69px] p-3  min-w-max border-b items-center justify-between sm:px-44 px-10">
        <Link href="/"><Dices size={32} /></Link>
        {
            user ? (
                <div className="flex items-center gap-2">
                    <UserButton />
                    <Link href="/dashboard"><Button size={"sm"}>Dashboard</Button></Link>
                </div>
            ) : (
                <Link href="/sign-in"><Button className="">
                    Login
                </Button></Link>
            )
        }
    </nav>
}