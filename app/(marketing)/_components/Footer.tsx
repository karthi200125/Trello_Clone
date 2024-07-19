import Logo from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import Link from "next/link"

const Footer = () => {
    return (
        <div className="w-full max-h-max flex flex-col px-[18px] md:px-[32px]">

            <div className="w-full flex flex-col md:flex-row items-center justify-between py-3 md:h-[200px] gap-3">
                <div className="w-full lg:w-[30%]">
                    <h1 className="font-bold text-[30px]">Subcribe</h1>
                    <p className="text-sm text-neutral-400">subscribe out new leter and never miss update . stay informed about the lastest news and exclusive offers</p>
                </div>
                <div className="w-full lg:w-[30%] space-y-3">
                    <h2 className="font-bold text-[15px]">stay up date</h2>
                    <div className="flex flex-col md:flex-row items-center gap-2">
                        <input type="text" className="text-[12px] rounded-md w-full pl-4 py-3 border-[1px] border-solid border-neutral-200" placeholder="Enter you email" />
                        <Button className="w-full md:max-h-max px-10 bg-black text-white">Subscribe</Button>
                    </div>
                    <p className="text-sm text-neutral-400">By subscribing agree with us</p>
                </div>
            </div>

            <Separator className="bg-neutral-200" />

            {/* bottoms footer */}
            <div className="w-full flex gap-2 flex-wrap md:flex-row items-center justify-between py-10">

                <div className="w-[47%] md:w-[130px] lg:w-[200px] bg-black text-white cursor-pointer rounded-full py-2 flex flex-row items-center gap-2 justify-center">
                    <Instagram />
                    <h1 className="font-semibold text-[12px] lg:text-lg">INSTAGRAM</h1>
                </div>
                <div className="w-[47%] md:w-[130px] lg:w-[200px] bg-black text-white cursor-pointer rounded-full py-2 flex flex-row items-center gap-2 justify-center">
                    <Facebook />
                    <h1 className="font-semibold text-[12px] lg:text-lg">FACEBOOK</h1>
                </div>

                <Logo />

                <div className="w-[47%] md:w-[130px] lg:w-[200px] bg-black text-white cursor-pointer rounded-full py-2 flex flex-row items-center gap-2 justify-center">
                    <Twitter />
                    <h1 className="font-semibold text-[12px] lg:text-lg">TWITTER</h1>
                </div>
                <div className="w-[47%] md:w-[130px] lg:w-[200px] bg-black text-white cursor-pointer rounded-full py-2 flex flex-row items-center gap-2 justify-center">
                    <Youtube />
                    <h1 className="font-semibold text-[12px] lg:text-lg">YOUTUPE</h1>
                </div>

            </div>
        </div>
    )
}

export default Footer