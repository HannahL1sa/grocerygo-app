import Link from 'next/link';

export default function Home() {
  return (
      <main className="mx-auto flex">
        <div className="w-9/12 p-10">
          <h1 className="text-7xl font-semibold ">Welcome to the GroceryGo Store</h1>
          <p className="text-2xl pt-10 pb-10">
              Shop for all your grocery needs conveniently and efficiently with our online grocery store.
              Our app is designed to streamline the process of creating and managing your grocery lists, making it easier than ever to get the items you need.
              Get started on your shopping journey today!
          </p>
        <div className=" flex">
          <Link href="/register">
          <button className="bg-rose-500 hover:bg-rose-700 text-white font-bold px-6 py-3.5 rounded">
            Get Started
            </button>
          </Link>
        </div> 
        </div>
        <div className="w-1/2">
        <img src="/app-logo.png" alt="App Logo" className="h-auto max-w-full" />
      </div>
      </main>
  );
}