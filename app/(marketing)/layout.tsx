import { Button } from "@/components/ui/button"
import About from "./_components/About"
import FAQ from "./_components/FAQ"
import Footer from "./_components/Footer"
import Navbar from "./_components/Navbar"
import Solutions from "./_components/Solutions"


const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full">
            <Navbar />
            <main className="pb-20">
                {children}
            </main>
            <About />
            <Solutions />
            <FAQ />
            <div className="py-10 h-[200px] flex items-center justify-center flex-col gap-5 bg-black text-white">
                <h1 className="text-3xl md:text-[40px] lg:text-[60px] text-white text-center">Ready to be more productive? </h1>
                <Button className="px-10 py-2 bg-white/10">Get Start free</Button>
            </div>
            <Footer />
        </div>
    )
}

export default MarketingLayout