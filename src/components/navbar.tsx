import { Dices } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"
import { currentUser } from "@clerk/nextjs/server"
import { checkAndCreateUser } from "@/lib/check-and-create-user"
import { LoggedInUser } from "./navbar/logged-in-user"


export const Navbar = async () => {

    const user = await currentUser();

    const userWallet = await checkAndCreateUser();



    return <nav className="flex max-h-[69px] min-h-[69px] p-3  min-w-max border-b items-center justify-between sm:px-44 px-10">
        <Link href="/"><Dices size={32} /></Link>
        {
            user ? (
                <LoggedInUser walletAmount={userWallet?.walletAmount ?? 0} />
            ) : (
                <LoggedOutUser />
            )
        }
    </nav>
}



const LoggedOutUser = () => {
    return <Link href="/sign-in"><Button className="">
        Login
    </Button></Link>
}