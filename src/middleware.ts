import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware({
  ...routing,
  defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_REGION || 'gb',
});

export const config = {
  matcher: [
    '/',
    `/(${process.env.NEXT_PUBLIC_DEFAULT_REGION || 'gb'})/:path*`,
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};