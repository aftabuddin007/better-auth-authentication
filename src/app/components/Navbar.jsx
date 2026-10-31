"use client"

import React from 'react';
import { Button } from "@heroui/react";
import Link from "next/link";
import { signOut, useSession } from "../lib/auth-client";

const Navbar = () => {
  const { data, isPending } = useSession();
  const user = data?.user;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="flex h-16 items-center justify-between">
          
          {/* Brand & Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white shadow-sm">
              A
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              ACME
            </span>
          </div>

          {/* Main Navigation (Hidden on very small screens) */}
          <ul className="hidden sm:flex items-center gap-8">
            <li>
              <Link 
                href="#" 
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                Features
              </Link>
            </li>
            <li>
              <Link 
                href="#" 
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                Pricing
              </Link>
            </li>
          </ul>

          {/* Auth Section */}
          <div className="flex items-center justify-end min-w-[140px]">
            {isPending ? (
              /* Loading Skeleton */
              <div className="h-8 w-24 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
            ) : user ? (
              /* Logged In State */
              <div className="flex items-center gap-4">
                <span className="hidden text-sm text-gray-600 md:block dark:text-gray-400">
                  Welcome, <span className="font-semibold text-gray-900 dark:text-white">{user.name}</span>!
                </span>
                <Button 
                  color="danger" 
                  variant="flat" 
                  size="sm" 
                  onPress={() => signOut()}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              /* Logged Out State */
              <Button 
                as={Link} 
                href="/auth/login" 
                color="primary" 
                variant="solid"
                size="sm"
              >
                Login
              </Button>
            )}
          </div>
          
        </header>
      </div>
    </nav>
  );
};

export default Navbar;