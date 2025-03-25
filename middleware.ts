import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";


export default withAuth(
    function middleware() {
        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const { pathname } = req.nextUrl

                //The middleware function will only be invoked if the authorized callback returns true.
                //so allow all auth related routes

                if (
                    pathname === "/api/auth/" ||
                    pathname === "/login" ||
                    pathname === "/register"
                ) {
                    return true
                }

                //public
                if (pathname === "/" || pathname.startsWith("/api/videos")) {
                    return true
                }

                return !!token
            }

        }
    }
)

//write all the path that needs to run the middleware
