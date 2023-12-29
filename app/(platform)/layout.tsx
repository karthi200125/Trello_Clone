import { ClerkProvider } from "@clerk/nextjs";

const platoformLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ClerkProvider>
            {children}
        </ClerkProvider>
    )
}

export default platoformLayout