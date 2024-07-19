import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { CalendarSearch, Users } from "lucide-react"
import { Poppins } from 'next/font/google'
import localFont from 'next/font/local'
import aboutimg from '../../../public/about.webp'

const headingFont = localFont({
    src: '../../../public/fonts/font.woff2'
})

const texFont = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

const About = () => {
    return (
        <div className="w-full flex flex-row min-h-[600px] p-[18px] md:p-[32px]">

            {/* left side */}
            <div className="w-full lg:flex-1 h-full space-y-8">
                <div className="px-5 py-2 text-sm rounded-full bg-black text-white uppercase font-bold max-w-max">About us</div>
                <h1 className="text-3xl text-center md:text-start md:text-[40px] xl:text-[60px] leading-none">
                    Solution For Efficinet Task Management
                </h1>
                <div className={cn("text-sm md:text-md text-neutral-400  mt-4 max-w-xs md:max-w-2xl max-auto", texFont.className)}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur architecto minus qui dolorem in, nihil natus deserunt soluta, odit facilis ullam labore autem ratione esse sunt? Culpa, dolore. Quae, eveniet.
                </div>

                <Separator />

                <div className="flex flex-col md:flex-row items-start gap-5">
                    <div className="flex-1 space-y-2">
                        <CalendarSearch className="h-8 w-8 text-orange-400" />
                        <h2 className="text-xl font-bold ">
                            smart sheduling
                        </h2>
                        <div className={cn("text-sm md:text-md text-neutral-400  mt-4 max-w-xs md:max-w-2xl max-auto", texFont.className)}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam obcaecati eligendi illum facilis, aspernatur officia!
                        </div>
                    </div>
                    <div className="flex-1 space-y-2">
                        <Users className="h-8 w-8 text-orange-400" />
                        <h2 className="text-xl font-bold ">
                            smart sheduling
                        </h2>
                        <div className={cn("text-sm md:text-md text-neutral-400  mt-4 max-w-xs md:max-w-2xl max-auto", texFont.className)}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam obcaecati eligendi illum facilis, aspernatur officia!
                        </div>
                    </div>
                </div>

            </div>

            {/* Right side */}
            <div className="hidden md:flex lg:flex-1 items-center justify-center h-[600px]">
                <div className="w-[80%] h-[90%] rounded-xl overflow-hidden bg-neutral-200">
                    <img src={aboutimg.src} alt="" className="w-full h-full object-contain" />
                </div>
            </div>

        </div>
    )
}

export default About