import Logo from "@/components/Logo"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const Navbar = () => {
    return (
        <div className="top-0 w-full h-20 px-4 bg-white flex items-center">
            <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
                <Logo />
                <div className=" space-x-4 md:block md:w-auto w-full flex justify-between items-center">
                    <Button size='sm' variant="outline" asChild className="rounded-full px-5">
                        <Link href='/signin'>
                            Login
                        </Link>
                    </Button>
                    <Button size='sm' asChild className="rounded-full px-5">
                        <Link href='/signup'>
                            Sign Up
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Navbar