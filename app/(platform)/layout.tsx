import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const platoformLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ClerkProvider>
            <Toaster />
            {children}
        </ClerkProvider>
    )
}

export default platoformLayout