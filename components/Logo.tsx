import Image from "next/image"
import Link from "next/link"
import localFont from 'next/font/local'
import { cn } from "@/lib/utils"

const headingFont = localFont({
    src: '../public/fonts/font.woff2'
})

const Logo = () => {
    return (
        <Link href='/'>
            <div className="hover:opacity-75 transition items-center hidden md:flex">
                <Image src='/logo.png' alt="logo" width={70} height={70} className="rounded-full" />
                <p className={cn("text-lg pb-1 bg-gradient-to-r from-purple-800 via-pink-600 to-orange-500 to-blue-700 text-transparent bg-clip-text",
                    headingFont.className)}>BirdBoard</p>
            </div>
        </Link>
    )
}

export default Logo