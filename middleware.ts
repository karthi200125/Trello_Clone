import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { url } from "inspector";
import { NextResponse } from "next/server";
export default authMiddleware({
    publicRoutes: ['/', '/api/webhooks'],
    afterAuth(auth, req) {
        if (auth.userId && auth.isPublicRoute) {
            let path = '/selectorg'

            if (auth.orgId) {
                path = `/organization/${auth.orgId}`
            }

            const orgSelction = new URL(path, req.url)
            return NextResponse.redirect(orgSelction)
        }
        if (!auth.userId && !auth.isPublicRoute) {
            return redirectToSignIn({ returnBackUrl: req.url })
        }

        if (auth.userId && !auth.orgId && req.nextUrl.pathname !== '/selectorg') {
            const orgSelction = new URL('/selectorg', req.url)
            return NextResponse.redirect(orgSelction)
        }
    }
});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
