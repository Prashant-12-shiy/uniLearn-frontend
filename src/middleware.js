import { NextResponse } from 'next/server';

export default function middleware(req) {
    const adminCookie = req.cookies.get('admin'); // Access cookies from the request
    const adminValue = adminCookie?.value; // Extract the value from the cookie object

    // If accessing /admin and admin cookie is not true, redirect to /login
    if (req.nextUrl.pathname.startsWith('/admin' || '/upload') && adminValue !== 'true') {
        // console.log('Redirecting to /login');
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // If accessing /login and admin cookie is true, redirect to /admin
    if (req.nextUrl.pathname.startsWith('/login') && adminValue === 'true') {
        // console.log('Redirecting to /admin');
        return NextResponse.redirect(new URL('/admin', req.url));
    }

    // console.log('Proceeding to requested path');
    return NextResponse.next(); // Allow access to the requested page
}
