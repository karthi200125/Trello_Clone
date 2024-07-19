import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check, CheckCircle, Medal } from "lucide-react"
import { Poppins } from 'next/font/google'
import localFont from 'next/font/local'
import Link from "next/link"
import bg from '../../public/bg.webp'

const headingFont = localFont({
    src: '../../public/fonts/font.woff2'
})

const texFont = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

const MarketingPage = () => {

    const Items = [
        { title: "Task Management" },
        { title: "Collabration Tools" },
        { title: "Task & todos" },
        { title: "Project Management" },
        { title: "Goals & Strategy" },
    ]

    return (
        <div className="flex mx-auto py-10 w-[95%] overflow-hidden min-h-screen flex-col gap-5 md:gap-10 bg-gradient-to-t from-white to-neutral-200 rounded-[40px] border-[1px] border-solid border-neutral-200">

            <div className="flex items-center justify-center flex-col">
                <div className={cn("flex items-center justify-center flex-col gap-10", headingFont.className)}>
                    <div className="flex items-center justify-center gap-2 px-10 py-3 bg-white rounded-full">
                        <Medal className="h-5 w-5" />
                        No 1 Task ManageMent
                    </div>
                    <h1 className="text-3xl md:text-6xl text-center text-neutral-800">
                        Taskify Helps team move
                    </h1>
                    <h1 className="text-3xl mt-[-30px] md:text-6xl text-center text-neutral-800">
                        Work Forward
                    </h1>
                </div>
                <div className={cn("text-sm md:text-md text-neutral-400  mt-4 max-w-xs md:max-w-2xl text-center mx-auto", texFont.className)}>
                    Collabrate manage , project and reach new productivity peaks. From high to the home office the way your team works is unique - accomplish all it all with OrganizeZen
                </div>
                <Button className="mt-6 py-4" size='lg' asChild>
                    <Link href='/signup'>Get Taskify for free</Link>
                </Button>
            </div>

            <div className="mt-10 mx-auto w-[90%] h-[200px] md:h-[400px] lg:h-[600px] relative">
                <img src={bg.src} alt="" className="object-contain absolute top-0 left-0 rounded-md md:rounded-[30px]" />
            </div>

            <div className="w-full lg:w-[60%] mx-auto flex flex-wrap items-center justify-center gap-5">
                {Items?.map((item) => (
                    <div key={item?.title} className="bg-white flex items-center gap-2 justify-center px-5 rounded-full border py-3">
                        <CheckCircle className="h-5 w-6 text-blue-500" />
                        <h1 className="font-semibold text-md">{item?.title}</h1>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MarketingPage