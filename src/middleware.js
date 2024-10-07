import * as jose from 'jose';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'

const JWT_SECRET = process.env.AUTH_SECRET_KEY;

const verifyToken = async (token) => {
    const secret = new TextEncoder().encode(JWT_SECRET);
    try {
        const { payload } = await jose.jwtVerify(token, secret);
        return payload.uid ? true : false;
    } catch (error) {
        console.error('Token verification failed:', error);
        return false;
    }
};

const redirectTo = (url, request, isProtectedRoute) => {
    const response = NextResponse.redirect(new URL(url, request.url));
    response.headers.set('x-pathname', isProtectedRoute ? "/sign-in" : request.nextUrl.pathname); // Set x-pathname header
    console.log("middleware : " + request.nextUrl);
    return response;
};

export async function middleware(request) {
    // console.log("middleware")
    const { pathname, searchParams } = request.nextUrl;
    const adminToken = cookies().get("admin-auth-token")?.value;
    const userToken = cookies().get("authToken")?.value;

    try {
        // Admin routes
        if (pathname.includes("admin")) {
            if (!adminToken && !pathname.includes("sign-in")) {
                return redirectTo("/admin/auth/sign-in", request);
            }
            if (adminToken && (pathname.includes("sign-in") || pathname.includes("sign-up"))) {
                const isValidToken = await verifyToken(adminToken);
                if (isValidToken) {
                    return redirectTo("/admin/dashboard", request);
                }
            }
        }

        // User routes
        if (!pathname.includes("admin")) {
            const protectedUserRoutes = ["cart", "account", "order-details", "place-your-order"];
            const isProtectedRoute = protectedUserRoutes.some(route => pathname.includes(route));
            const isAuthRoute = pathname.includes("sign-in") || pathname.includes("sign-up");

            if (!userToken && isProtectedRoute) {
                return redirectTo("/sign-in", request, true);
            }
            if (userToken && isAuthRoute) {
                const isValidToken = await verifyToken(userToken);
                if (isValidToken) {
                    return redirectTo("/", request);
                }
            }
        }
        const response = NextResponse.next();
        console.log("middleware : " + searchParams);
        response.headers.set("x-pathname", pathname); // Set pathname in the response headers
        response.headers.set("x-searchParams", searchParams); // Set pathname in the response headers
        return response;
    } catch (error) {
        console.error('Middleware error:', error);
        return redirectTo("/sign-in", request, true);
    }
}

export const config = {
    matcher: [
        '/api/admin/:path*',
        "/admin/:path*",
        "/sign-in",
        "/sign-up",
        "/cart",
        "/account/:path*",
        "/order-details/:path*",
        "/place-your-order/:path*",
        "/product/:path*",
        "/"
    ]
};