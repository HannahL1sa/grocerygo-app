"use client"
export default function footer() {
  return (
      <footer className="bg-emerald-950  text-white mt-auto m- p-0" >
        <div className="flex justify-center p-8">
        &copy; {new Date().getFullYear} GroceryGo™. All rights reserved.
        </div>
      </footer>
  )
}
