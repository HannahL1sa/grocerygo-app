"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Order() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const DeliveryMethod = {
    PICKUP: 'PICKUP',
    DELIVERY: 'DELIVERY',
  };

  const [deliveryMethod, setDeliveryMethod] = useState(DeliveryMethod.PICKUP);
  const [deliveryLocation, setDeliveryLocation] = useState('');

  const handleAddItem = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Check if itemName and itemQuantity are not empty
    if (itemName.trim() !== '' && itemQuantity.trim() !== '') {
      // Create a new item object
      const newItem = {
        name: itemName,
        quantity: itemQuantity,
      };

      // Update the items state with the new item
      setItems([...items, newItem]);

      // Clear the input fields
      setItemName('');
      setItemQuantity('');
    } else {
      // Handle the case where itemName or itemQuantity is empty
      alert('Please enter both item name and quantity.');
    }
  };

  const handleAddToGroceryList = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({items, deliveryMethod, deliveryLocation}),
    });

    // Check if the HTTP status code indicates success (2xx range)
    if (response.ok) {
      // Successful request, redirect to the dashboard
      router.push('/dashboard');
    } else {
      // Handle the case where the request was not successful
      console.error('Failed to add grocery list:', response.statusText);

      // Display an alert with the error message
      alert('Failed to add grocery list!');
    }
  }
  
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-5 text-center text-5xl font-bold leading-9 tracking-tight text-gray-900">
            Grocery List
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            {/* Delivery Method */}
            <div>
              <label htmlFor="deliveryMethod" className="block text-base font-bold leading-6 text-gray-900">
                Delivery Method
              </label>
              <div className="mt-2">
                <select
                  id="deliveryMethod"
                  name="deliveryMethod"
                  value={deliveryMethod}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                  className="input-field"
                >
                  <option value="PICKUP">PICKUP</option>
                  <option value="DELIVERY">DELIVERY</option>
                </select>
              </div>
            </div>

            {/* If Delivery is selected, show Location input */}
            {deliveryMethod === 'DELIVERY' && (
              <div>
                <label htmlFor="deliveryLocation" className="block text-base font-bold leading-6 text-gray-900">
                  Delivery Location
                </label>
                <div className="mt-2">
                  <input
                    id="deliveryLocation"
                    name="deliveryLocation"
                    type="text"
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    required
                    className="p-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="itemName" className="block text-base font-bold leading-6 text-gray-900">
                Item Name
              </label>
              <div className="mt-2">
                <input
                  id="itemName"
                  name="itemName"
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  required
                  className="p-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="quantity" className="block text-base font-bold leading-6 text-gray-900">
                Quantity
              </label>
              <div className="mt-2">
                <input
                  id="quantity"
                  name="quantity"
                  type="text"
                  value={itemQuantity}
                  onChange={(e) => setItemQuantity(e.target.value)}
                  required
                  className="p-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleAddItem}
                className="flex-1 justify-center rounded-md bg-rose-500 px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm hover:bg-rose-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                ADD
              </button>

              <button
                type="button"
                onClick={handleAddToGroceryList}
                className="flex-1 justify-center rounded-md bg-emerald-700 px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                ADD TO LIST
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}