import Navbar from "./_components/Navbar"

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full bg-slate-100">
            <Navbar/>
            <main className="pt-40 pb-20 bg-late-100">
                {children}
            </main>
        </div>
    )
}

export default MarketingLayout