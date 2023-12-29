import Logo from "@/components/Logo"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const Footer = () => {
    return (
        <div className="fixed bottom-0 w-full px-4 border-b bg-slate-100">
            <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
                <Logo />                
                <div className=" space-x-4 md:block md:w-auto w-full flex justify-between items-center">
                    <Button size='sm' variant="ghost" >
                        Privacy Policy
                    </Button>
                    <Button size='sm' variant="ghost" >
                        Terms of service
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Footer