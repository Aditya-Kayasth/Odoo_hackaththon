import NextAuth from "next-auth"
import authConfig from "./auth.config"

import { authRoutes, publicRoutes, apiAuthPrefix , Loginredirect} from "./routes"
 
const { auth: middleware } = NextAuth(authConfig)

export default middleware((req) => {

    const isLoggedIn = !!req.auth
    
    const nextUrl = req.nextUrl

    const isapiRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isauthRoute = authRoutes.includes(nextUrl.pathname)

    if (isapiRoute) {
        return;
    }
    if (isauthRoute) {
        if(isLoggedIn){
            return Response.redirect(new URL(Loginredirect,nextUrl))
        }
        return;
    }

    if(!isLoggedIn && !isPublicRoute){
        return Response.redirect(new URL("/login",nextUrl))
    }

    return;
})

export const config = {
  matcher: [
    // Exclude _next, static, favicon.ico, images, and all file extensions for static assets
    '/((?!api|_next/static|_next/image|favicon.ico|static|images|.*\\.(?:css|js|json|png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|eot|otf|txt|xml|csv|pdf|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}