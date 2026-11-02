import Link from 'next/link';
import { ArrowLeft, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 py-24 sm:py-32 lg:px-8 dark:bg-gray-950">
      {/* Visual Accent */}
      <div className="relative flex items-center justify-center">
        <span className="text-[140px] font-extrabold tracking-widest text-gray-200 sm:text-[180px] dark:text-gray-900 select-none">
          404
        </span>
        <div className="absolute flex flex-col items-center">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 ring-1 ring-inset ring-blue-600/20 dark:bg-blue-950/50 dark:text-blue-400 dark:ring-blue-500/30">
            Error 404
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            Page not found
          </h1>
        </div>
      </div>

      {/* Descriptive Text */}
      <p className="mt-4 max-w-md text-center text-base text-gray-600 dark:text-gray-400">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
      </p>

      {/* Actions */}
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
        <Link
          href="/search"
          className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <Search className="h-4 w-4" />
          Search Site
        </Link>
      </div>

      {/* Simple Footer/Contact link */}
      <p className="mt-16 text-xs text-gray-500 dark:text-gray-500">
        Think this is a mistake?{' '}
        <Link href="/contact" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
          Contact support
        </Link>
      </p>
    </div>
  );
}