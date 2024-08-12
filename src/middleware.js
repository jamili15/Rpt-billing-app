// middleware.js
import { NextResponse } from 'next/server';

const DOMAIN_PATH = process.env.NEXT_PUBLIC_APP_CONTEXT_PATH || "";

export function middleware(req) {
    const url = req.nextUrl.clone();

    // Check if the request is for the custom API prefix
    if (DOMAIN_PATH && url.pathname.startsWith(DOMAIN_PATH + '/api')) {
        // Rewrite the request to the actual API route
        url.pathname = url.pathname.replace(new RegExp(`^${DOMAIN_PATH}`), '');
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}
