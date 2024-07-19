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
            <div className="hover:opacity-75 transition items-center hidden md:flex gap-2">
                <Image src='/logo.png' alt="logo" width={50} height={50} className="object-contain" />
                <Image src='/taskify.png' alt="logo" width={80} height={50} className="object-contain" />                
            </div>
        </Link>
    )
}

export default Logo