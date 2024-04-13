"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Header(){
  const router = useRouter();
  
  // Check the user's authentication status
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/'); // Redirect to the home page after signing out
  };
  return (
    // Header container with background color and text color styling
    <header className="bg-emerald-950 text-white p-2">
      {/* Navigation bar with flex layout */}
      <nav className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        {/* Logo section with a link to the home page */}
        <div className="logo">
          <Link href="/">
            <img src="/app-logo.png" alt="App Logo" className="h-20 w-20" />
          </Link>
        </div>
        {/* Navigation links with appropriate spacing and font style */}
        <div className="nav-links space-x-10 font-medium">
          {/* Conditional rendering based on authentication status */}
          {!session && (
            // Display these links for non-authenticated users
            <>
            <Link className="hover:text-yellow-400" href="/about">About Us</Link>
            <Link className="hover:text-yellow-400" href="/login">Login</Link>
            </>
          )}
          {/* Conditional rendering for authenticated users */}
          {session && (
            // Display these links and button for authenticated users
            <>
              <Link className="hover:text-yellow-400" href="/dashboard">Dashboard</Link>
              <Link className="hover:text-yellow-400" href="/order">Order</Link>
              <button className="hover:text-yellow-400" onClick={handleLogout}>Logout</button>
            </>
          )}
          {/* Always display this common link */}
          <Link className="hover:text-yellow-400" href="/contact">Contact</Link>
        </div>
      </nav>
    </header>
  );
}