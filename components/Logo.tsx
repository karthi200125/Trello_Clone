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
                <Image src='/logo.png' alt="logo" width={100} height={100} className="rounded-full"/>
                <p className={cn("text-lg text-[rgba(253,246,194,255)] pb-1", headingFont.className)}>OrganizeZen</p>
            </div>
        </Link>
    )
}

export default Logo