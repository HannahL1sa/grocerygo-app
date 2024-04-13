"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Order() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  /*
  const [selectedCategory, setSelectedCategory] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  */

  const handleCategory = async (category) => {
    console.log(category);
    router.push(`category/?search=${encodeURIComponent(category)}`);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Perform search functionality based on searchTerm
    // You can filter or update item list based on the search term
  };

  const groceryCategories = [
    'Kitchen Staples',
    'Canned Goods',
    'Beverages',
    'Household Supplies',
    'Personal Care',
    'Snacks',
  ];

  return (
    <div className='flex flex-col p-20 justify-center'>
            {/* Search Bar */}
            <input
        type="text"
        placeholder="Search for grocery items here..."
        value={searchTerm}
        onChange={handleSearch}
        className="p-2 rounded-md border-2 border-gray-300 mb-8"
      />
      <h3 className="text-3xl font-bold mb-2 text-center p-8">GROCERY CATEGORIES</h3>

      {/* Display Grocery Categories */}
      <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
        {groceryCategories.map((category, index) => (
          <div key={index}>
            <div
            onClick={() => handleCategory(category)}
            className="cursor-pointer hover:bg-emerald-100 p-10 border-2 border-gray-300 rounded-md text-2xl font-semibold text-center"
            >
            {category}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

