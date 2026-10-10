"use client"
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f8fbf8] text-[#203328]">
      <nav className="flex items-center justify-between px-6 py-6 md:px-16">
        <Link
          href="/"
          className="inline-flex flex-row flex-nowrap items-center gap-1 whitespace-nowrap text-2xl font-extrabold tracking-tight"
        >
          <Image
            src="/app-logo.png"
            alt="Grocery Go"
            width={50}
            height={50}
          />
          <span>
            Grocery Go <span className="text-green-700">.</span>
          </span>
        </Link>

        <div className="flex items-center gap-5 text-sm font-medium">
          <Link href="/login" className="hover:text-green-700">
            Log in
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-green-700 px-5 py-3 text-white transition hover:bg-green-800"
          >
            Get started
          </Link>
        </div>
      </nav>

      <section className="mx-auto flex max-w-5xl flex-col items-center px-6 py-24 text-center md:py-32">
        <span className="rounded-full bg-green-100 px-4 py-2 text-xs font-bold tracking-widest text-green-800">
          YOUR GROCERIES, ORGANIZED
        </span>

        <h1 className="mt-8 text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
          Grocery shopping,
          <span className="mt-2 block text-green-700">
            made simpler.
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-base leading-8 text-gray-600 md:text-lg">
          Plan your grocery trips, organize your shopping
          lists, and keep everything you need in one place.
        </p>

        <div className="mt-9 flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
          <Link
            href="/register"
            className="rounded-xl bg-green-700 px-7 py-4 font-semibold text-white shadow-sm transition hover:bg-green-800"
          >
            Create your free account →
          </Link>

          <Link
            href="/login"
            className="rounded-xl border border-gray-200 bg-white px-7 py-4 font-semibold transition hover:bg-gray-50"
          >
            I already have an account
          </Link>
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm text-gray-600">
          <span>✓ Organize your lists</span>
          <span>✓ Track your items</span>
          <span>✓ Simplify every shopping trip</span>
        </div>

        <div className="mt-16 grid w-full max-w-3xl gap-4 text-left sm:grid-cols-3">
          <div className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
            <span className="text-3xl">📝</span>
            <h2 className="mt-4 font-bold">Create lists</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Keep your shopping organized in one place.
            </p>
          </div>

          <div className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
            <span className="text-3xl">🥑</span>
            <h2 className="mt-4 font-bold">Add groceries</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Record the items you need for your next trip.
            </p>
          </div>

          <div className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
            <span className="text-3xl">✓</span>
            <h2 className="mt-4 font-bold">Check items off</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Track what you have already picked up.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-200 px-6 py-6 text-center text-sm text-gray-500">
        Grocery Go © 2026. Simplify your shopping.
      </footer>
    </main>
  );
}
