// middleware.ts

/**
 * Importing the NextRequest type from the 'next/server' module.
 * This type represents the incoming request object in a Next.js serverless function.
 */
import type { NextRequest } from 'next/server';
/**
 * Importing the createI18nMiddleware function from the 'next-international/middleware' module.
 * This function creates a middleware for internationalization in Next.js applications.
 */
import { createI18nMiddleware } from 'next-international/middleware';

/**
 * Creating an instance of the i18n middleware using the createI18nMiddleware function.
 * This middleware handles internationalization for the application.
 */
const I18nMiddleware = createI18nMiddleware({
  defaultLocale: 'uk',
  locales: ['uk', 'en'],
  urlMappingStrategy: 'rewriteDefault',
});

/**
 * Middleware function that wraps the i18n middleware.
 * This function is used to handle the incoming request and pass it to the i18n middleware.
 * @param request - The incoming request object.
 * @returns The result of the i18n middleware.
 */
export function middleware(request: NextRequest) {
  return I18nMiddleware(request);
}

/**
 * Configuration object for the middleware.
 * This object is used to define the matcher for the middleware.
 */
export const config = {
  /**
   * The matcher property defines the pattern for matching the URL paths that should be handled by the middleware.
   * This pattern excludes paths that start with '/api', '/static', have a file extension, or match certain specific paths like '_next', 'favicon.ico', and 'robots.txt'.
   */
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)'],
};
