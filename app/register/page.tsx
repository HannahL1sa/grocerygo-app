import Link from "next/link";
import Register from "@/components/register";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-[#f8fbf8] px-4 py-8">
      <Link
        href="/"
        className="mb-8 text-2xl font-extrabold tracking-tight text-[#203328]"
      >
        Grocery Go<span className="text-green-700">.</span>
      </Link>

      <Register />
    </main>
  );
}
